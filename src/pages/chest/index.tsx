import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import './index.scss'

// 宝箱等级类型
type ChestLevel = 'diamond' | 'gold' | 'silver' | 'bronze'

// 宝箱配置
const CHEST_CONFIG: Record<ChestLevel, { icon: string; name: string; color: string }> = {
  diamond: { icon: '💎', name: '钻石宝箱', color: '#b9f2ff' },
  gold: { icon: '🏆', name: '黄金宝箱', color: '#ffd700' },
  silver: { icon: '🥈', name: '白银宝箱', color: '#c0c0c0' },
  bronze: { icon: '🥉', name: '青铜宝箱', color: '#cd7f32' }
}

export default function Chest() {
  const [todayChest, setTodayChest] = useState<{
    level: ChestLevel
    unlockTime: number
    opened: boolean
  } | null>(null)
  const [streak, setStreak] = useState(0)
  const [totalChests, setTotalChests] = useState(0)
  const [canOpen, setCanOpen] = useState(false)
  const [countdown, setCountdown] = useState('')

  // 加载数据
  useEffect(() => {
    const loadData = () => {
      try {
        const data = Taro.getStorageSync('suns_puzzle_game_data')
        if (data) {
          setTodayChest(data.todayChest || null)
          setStreak(data.streak || 0)
          setTotalChests(data.totalChests || 0)
        }
      } catch (e) {
        console.log('加载数据失败', e)
      }
    }
    loadData()
  }, [])

  // 更新倒计时
  useEffect(() => {
    if (!todayChest?.unlockTime) return

    const timer = setInterval(() => {
      const now = Date.now()
      const diff = todayChest.unlockTime - now

      if (diff <= 0) {
        setCanOpen(true)
        setCountdown('')
      } else {
        setCanOpen(false)
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setCountdown(`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [todayChest])

  // 开箱
  const handleOpenChest = () => {
    if (!canOpen || !todayChest || todayChest.opened) return

    // 更新宝箱状态
    const data = Taro.getStorageSync('suns_puzzle_game_data') || {}
    const updatedData = {
      ...data,
      todayChest: { ...todayChest, opened: true },
      totalChests: (data.totalChests || 0) + 1
    }

    Taro.setStorageSync('suns_puzzle_game_data', updatedData)
    setTodayChest({ ...todayChest, opened: true })
    setTotalChests(prev => prev + 1)

    // 显示奖励
    Taro.showModal({
      title: '🎉 恭喜获得奖励！',
      content: `${CHEST_CONFIG[todayChest.level].name}已开启\n获得 100 金币 + 1 道具`,
      showCancel: false,
      confirmText: '太棒了'
    })
  }

  // 去挑战
  const handleGoChallenge = () => {
    Taro.switchTab({ url: '/pages/index/index' })
  }

  return (
    <View className='chest-page'>
      {/* 头部统计 */}
      <View className='stats-header'>
        <View className='stat-item'>
          <Text className='stat-value'>{streak}</Text>
          <Text className='stat-label'>连续开箱</Text>
        </View>
        <View className='stat-divider' />
        <View className='stat-item'>
          <Text className='stat-value'>{totalChests}</Text>
          <Text className='stat-label'>总开箱数</Text>
        </View>
      </View>

      {/* 今日宝箱 */}
      <View className='today-chest-section'>
        <Text className='section-title'>今日宝箱</Text>

        {!todayChest ? (
          <View className='no-chest'>
            <Text className='no-chest-icon'>🔒</Text>
            <Text className='no-chest-text'>完成今日关卡获得宝箱</Text>
            <Button className='go-btn' onClick={handleGoChallenge}>
              去挑战
            </Button>
          </View>
        ) : (
          <View className='chest-display'>
            <View
              className='chest-box'
              style={{ borderColor: CHEST_CONFIG[todayChest.level].color }}
            >
              <Text className='chest-icon'>
                {todayChest.opened ? '📭' : CHEST_CONFIG[todayChest.level].icon}
              </Text>
              <Text
                className='chest-name'
                style={{ color: CHEST_CONFIG[todayChest.level].color }}
              >
                {CHEST_CONFIG[todayChest.level].name}
              </Text>
            </View>

            {todayChest.opened ? (
              <Text className='chest-status'>已开启</Text>
            ) : canOpen ? (
              <Button className='open-btn' onClick={handleOpenChest}>
                开启宝箱
              </Button>
            ) : (
              <View className='countdown-display'>
                <Text className='countdown-label'>冷却中</Text>
                <Text className='countdown-time'>{countdown}</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* 宝箱等级说明 */}
      <View className='level-guide'>
        <Text className='section-title'>宝箱等级说明</Text>
        <View className='level-list'>
          {Object.entries(CHEST_CONFIG).map(([level, config]) => (
            <View key={level} className='level-item'>
              <Text className='level-icon'>{config.icon}</Text>
              <View className='level-info'>
                <Text className='level-name' style={{ color: config.color }}>
                  {config.name}
                </Text>
                <Text className='level-condition'>
                  {level === 'diamond' && '1次通关 + 0道具'}
                  {level === 'gold' && '1-2次通关 + ≤1道具'}
                  {level === 'silver' && '3-5次通关 + ≤2道具'}
                  {level === 'bronze' && '6次以上或用完道具'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 连续开箱奖励 */}
      <View className='streak-rewards'>
        <Text className='section-title'>连续开箱奖励</Text>
        <View className='reward-list'>
          <View className={`reward-item ${streak >= 7 ? 'achieved' : ''}`}>
            <Text className='reward-day'>7天</Text>
            <Text className='reward-icon'>🎁</Text>
            <Text className='reward-text'>特殊道具</Text>
          </View>
          <View className={`reward-item ${streak >= 14 ? 'achieved' : ''}`}>
            <Text className='reward-day'>14天</Text>
            <Text className='reward-icon'>🎪</Text>
            <Text className='reward-text'>保底金箱</Text>
          </View>
          <View className={`reward-item ${streak >= 30 ? 'achieved' : ''}`}>
            <Text className='reward-day'>30天</Text>
            <Text className='reward-icon'>🏆</Text>
            <Text className='reward-text'>实体周边</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
