import { View, Text, Canvas, Button } from '@tarojs/components'
import Taro, { useReady } from '@tarojs/taro'
import { useState, useRef, useCallback, useEffect } from 'react'
import './index.scss'

// 图块类型定义
interface Tile {
  id: number
  type: number       // 图块类型 (0-5)
  x: number          // X 坐标
  y: number          // Y 坐标
  layer: number      // 层级
  visible: boolean   // 是否可见
  selected: boolean  // 是否被选中（在槽位中）
}

// 图块图标 emoji
const TILE_ICONS = ['🏓', '🏅', '🥇', '🦈', '⭐', '❤️']
const TILE_COLORS = ['#FF6B6B', '#4ECDC4', '#FFD93D', '#6BCB77', '#FF8B94', '#C9B1FF']

// 游戏配置
const GAME_CONFIG = {
  tileSize: 60,      // 图块大小
  tileGap: 5,        // 图块间距
  maxSlots: 7,       // 槽位最大数量
  matchCount: 3,     // 匹配消除数量
  canvasWidth: 350,  // 画布宽度
  canvasHeight: 450, // 画布高度
}

// 生成关卡数据
const generateLevel = (tileTypes: number = 6, totalTiles: number = 36, layers: number = 3): Tile[] => {
  const tiles: Tile[] = []
  let id = 0

  // 确保每种类型的图块数量是3的倍数
  const tilesPerType = Math.floor(totalTiles / tileTypes)
  const typePool: number[] = []

  for (let t = 0; t < tileTypes; t++) {
    for (let i = 0; i < tilesPerType; i++) {
      typePool.push(t)
    }
  }

  // 打乱顺序
  for (let i = typePool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [typePool[i], typePool[j]] = [typePool[j], typePool[i]]
  }

  // 生成图块位置
  const gridCols = 5
  const gridRows = Math.ceil(typePool.length / gridCols / layers)

  for (let layer = 0; layer < layers; layer++) {
    const tilesInLayer = Math.floor(typePool.length / layers)
    const startIndex = layer * tilesInLayer

    for (let i = 0; i < tilesInLayer && startIndex + i < typePool.length; i++) {
      const col = i % gridCols
      const row = Math.floor(i / gridCols)

      // 添加随机偏移
      const offsetX = (Math.random() - 0.5) * 20
      const offsetY = (Math.random() - 0.5) * 20

      tiles.push({
        id: id++,
        type: typePool[startIndex + i],
        x: col * (GAME_CONFIG.tileSize + GAME_CONFIG.tileGap) + 30 + offsetX + layer * 10,
        y: row * (GAME_CONFIG.tileSize + GAME_CONFIG.tileGap) + 30 + offsetY + layer * 10,
        layer,
        visible: true,
        selected: false
      })
    }
  }

  return tiles
}

export default function Game() {
  const [tiles, setTiles] = useState<Tile[]>([])
  const [slots, setSlots] = useState<Tile[]>([])
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWin, setIsWin] = useState(false)
  const [toolsUsed, setToolsUsed] = useState({ undo: 0, remove: 0, shuffle: 0 })
  const canvasRef = useRef<any>(null)

  // 初始化游戏
  const initGame = useCallback(() => {
    setTiles(generateLevel())
    setSlots([])
    setIsGameOver(false)
    setIsWin(false)
    setToolsUsed({ undo: 0, remove: 0, shuffle: 0 })
  }, [])

  useEffect(() => {
    initGame()
  }, [initGame])

  // Canvas 准备完成后绘制
  useReady(() => {
    drawCanvas()
  })

  // 绘制游戏画布
  const drawCanvas = useCallback(() => {
    const ctx = Taro.createCanvasContext('gameCanvas')

    // 清空画布
    ctx.setFillStyle('#16213e')
    ctx.fillRect(0, 0, GAME_CONFIG.canvasWidth, GAME_CONFIG.canvasHeight)

    // 按层级排序绘制图块（底层先绘制）
    const sortedTiles = [...tiles].filter(t => t.visible).sort((a, b) => a.layer - b.layer)

    sortedTiles.forEach(tile => {
      const { x, y, type, layer } = tile

      // 绘制阴影
      ctx.setFillStyle('rgba(0, 0, 0, 0.3)')
      ctx.fillRect(x + 4, y + 4, GAME_CONFIG.tileSize, GAME_CONFIG.tileSize)

      // 绘制图块背景
      const brightness = 0.7 + layer * 0.1
      ctx.setFillStyle(adjustBrightness(TILE_COLORS[type], brightness))
      ctx.fillRect(x, y, GAME_CONFIG.tileSize, GAME_CONFIG.tileSize)

      // 绘制图块边框
      ctx.setStrokeStyle('rgba(255, 255, 255, 0.3)')
      ctx.setLineWidth(2)
      ctx.strokeRect(x, y, GAME_CONFIG.tileSize, GAME_CONFIG.tileSize)

      // 绘制图标文字（居中）
      ctx.setFontSize(32)
      ctx.setTextAlign('center')
      ctx.setTextBaseline('middle')
      ctx.setFillStyle('#ffffff')
      ctx.fillText(TILE_ICONS[type], x + GAME_CONFIG.tileSize / 2, y + GAME_CONFIG.tileSize / 2)
    })

    ctx.draw()
  }, [tiles])

  // 监听 tiles 变化重新绘制
  useEffect(() => {
    if (tiles.length > 0) {
      drawCanvas()
    }
  }, [tiles, drawCanvas])

  // 调整颜色亮度
  const adjustBrightness = (hex: string, factor: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    const newR = Math.min(255, Math.floor(r * factor))
    const newG = Math.min(255, Math.floor(g * factor))
    const newB = Math.min(255, Math.floor(b * factor))

    return `rgb(${newR}, ${newG}, ${newB})`
  }

  // 处理点击
  const handleCanvasClick = (e: any) => {
    if (isGameOver || isWin) return

    // H5 和小程序的事件结构不同，需要兼容处理
    let x: number, y: number

    // 获取 canvas 元素的位置
    const getCanvasRect = () => {
      const canvasEl = document.querySelector('.game-canvas canvas, .game-canvas')
      if (canvasEl) {
        return canvasEl.getBoundingClientRect()
      }
      return { left: 0, top: 0 }
    }

    if (e.touches && e.touches[0]) {
      // 触摸事件
      const touch = e.touches[0]
      const rect = getCanvasRect()
      x = touch.clientX - rect.left
      y = touch.clientY - rect.top
    } else if (e.clientX !== undefined) {
      // 鼠标点击事件
      const rect = getCanvasRect()
      x = e.clientX - rect.left
      y = e.clientY - rect.top
    } else if (e.detail && e.detail.x !== undefined) {
      // 小程序事件
      x = e.detail.x
      y = e.detail.y
    } else {
      console.log('Unknown event structure:', e)
      return
    }

    console.log('Click position:', x, y)

    // 找到点击的图块（从最上层开始）
    const clickedTile = [...tiles]
      .filter(t => t.visible)
      .sort((a, b) => b.layer - a.layer)
      .find(tile => {
        return x >= tile.x && x <= tile.x + GAME_CONFIG.tileSize &&
               y >= tile.y && y <= tile.y + GAME_CONFIG.tileSize
      })

    if (!clickedTile) return

    // 检查是否被遮挡（更上层是否有图块与之重叠）
    const isBlocked = tiles.some(t =>
      t.visible &&
      t.layer > clickedTile.layer &&
      t.x < clickedTile.x + GAME_CONFIG.tileSize &&
      t.x + GAME_CONFIG.tileSize > clickedTile.x &&
      t.y < clickedTile.y + GAME_CONFIG.tileSize &&
      t.y + GAME_CONFIG.tileSize > clickedTile.y
    )

    if (isBlocked) {
      Taro.showToast({ title: '该图块被遮挡', icon: 'none', duration: 1000 })
      return
    }

    // 添加到槽位
    const newSlots = [...slots, { ...clickedTile, selected: true }]

    // 隐藏原图块
    const newTiles = tiles.map(t =>
      t.id === clickedTile.id ? { ...t, visible: false } : t
    )

    // 检查是否有匹配
    const { updatedSlots, matched } = checkMatch(newSlots)

    setTiles(newTiles)
    setSlots(updatedSlots)

    // 检查胜负
    if (matched && newTiles.every(t => !t.visible)) {
      // 所有图块消除，胜利
      setIsWin(true)
      Taro.showToast({ title: '🎉 恭喜通关！', icon: 'success' })
    } else if (updatedSlots.length >= GAME_CONFIG.maxSlots) {
      // 槽位满了，失败
      setIsGameOver(true)
      Taro.showToast({ title: '💔 挑战失败', icon: 'error' })
    }
  }

  // 检查匹配
  const checkMatch = (currentSlots: Tile[]): { updatedSlots: Tile[], matched: boolean } => {
    const typeCounts: { [key: number]: number } = {}

    currentSlots.forEach(t => {
      typeCounts[t.type] = (typeCounts[t.type] || 0) + 1
    })

    // 找到可以消除的类型
    const matchedType = Object.entries(typeCounts).find(([_, count]) => count >= GAME_CONFIG.matchCount)

    if (matchedType) {
      const typeToRemove = parseInt(matchedType[0])
      let removeCount = 0

      const updatedSlots = currentSlots.filter(t => {
        if (t.type === typeToRemove && removeCount < GAME_CONFIG.matchCount) {
          removeCount++
          return false
        }
        return true
      })

      return { updatedSlots, matched: true }
    }

    return { updatedSlots: currentSlots, matched: false }
  }

  // 撤回道具
  const handleUndo = () => {
    if (slots.length === 0 || toolsUsed.undo >= 1) return

    const lastSlot = slots[slots.length - 1]
    const newSlots = slots.slice(0, -1)
    const newTiles = tiles.map(t =>
      t.id === lastSlot.id ? { ...t, visible: true } : t
    )

    setSlots(newSlots)
    setTiles(newTiles)
    setToolsUsed(prev => ({ ...prev, undo: prev.undo + 1 }))
  }

  // 移出道具
  const handleRemove = () => {
    if (slots.length === 0 || toolsUsed.remove >= 1) return

    // 移除第一个图块
    const removedSlot = slots[0]
    const newSlots = slots.slice(1)
    const newTiles = tiles.map(t =>
      t.id === removedSlot.id ? { ...t, visible: true } : t
    )

    setSlots(newSlots)
    setTiles(newTiles)
    setToolsUsed(prev => ({ ...prev, remove: prev.remove + 1 }))
  }

  // 洗牌道具
  const handleShuffle = () => {
    if (toolsUsed.shuffle >= 1) return

    const visibleTiles = tiles.filter(t => t.visible)
    const positions = visibleTiles.map(t => ({ x: t.x, y: t.y }))

    // 打乱位置
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]]
    }

    // 应用新位置
    let posIndex = 0
    const newTiles = tiles.map(t => {
      if (t.visible) {
        return { ...t, x: positions[posIndex].x, y: positions[posIndex++].y }
      }
      return t
    })

    setTiles(newTiles)
    setToolsUsed(prev => ({ ...prev, shuffle: prev.shuffle + 1 }))
  }

  // 重新开始
  const handleRestart = () => {
    initGame()
  }

  // 返回首页
  const handleBack = () => {
    Taro.navigateBack()
  }

  return (
    <View className='game-page'>
      {/* 游戏画布 */}
      <View className='canvas-container'>
        <Canvas
          canvasId='gameCanvas'
          className='game-canvas'
          style={{ width: `${GAME_CONFIG.canvasWidth}px`, height: `${GAME_CONFIG.canvasHeight}px` }}
          onTouchStart={handleCanvasClick}
          onClick={handleCanvasClick}
        />
      </View>

      {/* 槽位栏 */}
      <View className='slot-bar'>
        {Array.from({ length: GAME_CONFIG.maxSlots }).map((_, index) => (
          <View key={index} className='slot'>
            {slots[index] && (
              <Text className='slot-icon'>{TILE_ICONS[slots[index].type]}</Text>
            )}
          </View>
        ))}
      </View>

      {/* 道具栏 */}
      <View className='tool-bar'>
        <Button
          className={`tool-btn ${toolsUsed.undo >= 1 ? 'disabled' : ''}`}
          onClick={handleUndo}
          disabled={toolsUsed.undo >= 1}
        >
          ↩️ 撤回
        </Button>
        <Button
          className={`tool-btn ${toolsUsed.remove >= 1 ? 'disabled' : ''}`}
          onClick={handleRemove}
          disabled={toolsUsed.remove >= 1}
        >
          🗑️ 移出
        </Button>
        <Button
          className={`tool-btn ${toolsUsed.shuffle >= 1 ? 'disabled' : ''}`}
          onClick={handleShuffle}
          disabled={toolsUsed.shuffle >= 1}
        >
          🔀 洗牌
        </Button>
      </View>

      {/* 游戏结束弹窗 */}
      {(isGameOver || isWin) && (
        <View className='game-over-modal'>
          <View className='modal-content'>
            <Text className='modal-title'>{isWin ? '🎉 恭喜通关!' : '💔 挑战失败'}</Text>
            <Text className='modal-subtitle'>
              {isWin ? '你太厉害了！' : '再接再厉！'}
            </Text>
            <View className='modal-buttons'>
              <Button className='modal-btn primary' onClick={handleRestart}>
                再来一次
              </Button>
              <Button className='modal-btn secondary' onClick={handleBack}>
                返回首页
              </Button>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}
