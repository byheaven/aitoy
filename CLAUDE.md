# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

**鲨之星 (Suns Puzzle)** - 孙颖莎主题的 3-Tiles 消除游戏，支持微信小程序、抖音小程序和 H5 多端发布。

**Branch Info**:
- `main` - 原 AMIO 3D 平台项目 (已归档，部署在 demo.amio.love)
- `game-mvp` - 游戏开发主分支 (当前)

## Technology Stack

### Framework
- **Taro 3.6.32** - 跨端开发框架
- **React 18** - UI 框架
- **TypeScript 5** - 类型安全
- **Sass** - 样式预处理器

### Build Targets
- **H5** - 网页版本 (将部署到 game.amio.love)
- **微信小程序** (weapp)
- **抖音小程序** (tt)

### Rendering
- **Canvas 2D** - 游戏图块渲染和动画
- **Taro Components** - UI 组件

### Data Storage
- **Taro Storage API** - 本地存储 (跨端兼容 LocalStorage)

## Project Structure

```
src/
├── app.tsx                 # App 入口
├── app.config.ts          # 路由和 TabBar 配置
├── app.scss               # 全局样式
├── index.html             # H5 模板
├── custom-tab-bar/        # 自定义底部导航
│   ├── index.tsx
│   ├── index.scss
│   └── index.config.ts
└── pages/
    ├── index/             # 每日关卡首页
    │   ├── index.tsx
    │   ├── index.config.ts
    │   └── index.scss
    ├── game/              # 游戏页面 (Canvas 渲染)
    │   ├── index.tsx
    │   ├── index.config.ts
    │   └── index.scss
    └── chest/             # 宝箱页面
        ├── index.tsx
        ├── index.config.ts
        └── index.scss

config/
├── index.ts               # Taro 主配置
├── dev.ts                 # 开发环境配置
└── prod.ts                # 生产环境配置

dist/
├── h5/                    # H5 构建输出
├── weapp/                 # 微信小程序构建输出
└── tt/                    # 抖音小程序构建输出
```

## Common Commands

```bash
# 安装依赖
npm install

# H5 开发 (热更新)
npm run dev:h5

# H5 构建
npm run build:h5

# 微信小程序开发
npm run dev:weapp

# 微信小程序构建
npm run build:weapp

# 抖音小程序开发
npm run dev:tt

# 抖音小程序构建
npm run build:tt

# ESLint 检查
npm run lint

# 本地预览 H5 构建
npx serve dist/h5 -p 3456
```

## Game Mechanics

### 3-Tiles 消除规则
1. 点击图块将其移入底部槽位栏（最多 7 个）
2. 槽位栏集齐 3 个相同图块即自动消除
3. 槽位栏满 7 个且无法消除则游戏失败
4. 消除所有图块即为通关

### 图块系统
- 10 种不同图案的图块（Emoji 表情）
- 多层堆叠设计，上层遮挡下层
- 只有最上层且未被遮挡的图块可点击

### 道具系统
| 道具 | 功能 | 使用限制 |
|------|------|----------|
| 撤回 | 撤回上一步操作 | 每局 3 次 |
| 洗牌 | 随机打乱所有图块位置 | 每局 1 次 |
| 移除 | 直接移除槽位栏最后一个图块 | 每局 1 次 |

### 宝箱等级系统
根据通关表现获得不同等级宝箱：

| 等级 | 图标 | 获得条件 |
|------|------|----------|
| 钻石 | 💎 | 1 次通关 + 0 道具使用 |
| 黄金 | 🏆 | 1-2 次通关 + ≤1 道具 |
| 白银 | 🥈 | 3-5 次通关 + ≤2 道具 |
| 青铜 | 🥉 | 6 次以上或用完道具 |

### 连续开箱奖励
- **7 天**: 特殊道具
- **14 天**: 保底金箱
- **30 天**: 实体周边

## Data Storage

### Storage Key
```typescript
Taro.getStorageSync('suns_puzzle_game_data')
```

### Data Structure
```typescript
interface GameData {
  level: number           // 当前关卡
  streak: number          // 连续开箱天数
  totalChests: number     // 累计开箱数
  todayChest: {           // 今日宝箱
    level: 'diamond' | 'gold' | 'silver' | 'bronze'
    unlockTime: number    // 解锁时间戳
    opened: boolean       // 是否已开启
  } | null
}
```

## Canvas Game Engine

游戏核心渲染逻辑位于 `src/pages/game/index.tsx`:

### Key Functions
| 函数 | 功能 |
|------|------|
| `generateTiles()` | 生成可解关卡的图块数组 |
| `renderGame()` | Canvas 渲染主循环 |
| `handleCanvasClick()` | 点击检测和图块选择 |
| `checkMatch()` | 3-Tiles 匹配消除检测 |

### Tile Interface
```typescript
interface Tile {
  id: number
  type: number      // 图块类型 (0-9)
  x: number         // X 坐标
  y: number         // Y 坐标
  layer: number     // 层级 (越大越上层)
  visible: boolean  // 是否可见
}
```

### Canvas Settings
- **设计宽度**: 750rpx
- **图块尺寸**: 80rpx × 80rpx
- **槽位栏**: 7 个槽位
- **背景色**: #16213e (深蓝)

## Deployment

### H5 (Vercel) - 待配置
- 构建输出: `dist/h5/`
- 目标域名: `game.amio.love`
- 构建命令: `npm run build:h5`

### 微信小程序
- 构建输出: `dist/weapp/`
- 使用微信开发者工具导入并上传
- 需要在 `project.config.json` 配置 AppID

### 抖音小程序
- 构建输出: `dist/tt/`
- 使用抖音开发者工具导入并上传
- 需要在 `project.tt.json` 配置 AppID

## Development Guidelines

### Git Workflow
- **main 分支**: 原 AMIO 3D 平台项目 (归档状态)
- **game-mvp 分支**: 游戏开发主分支
- 使用描述性英文 commit 信息
- 自动添加 Claude Code 签名

### Code Standards
- TypeScript 严格模式
- 遵循 ESLint 规则
- React 函数式组件 + Hooks
- 样式使用 rpx 单位 (基于 750 设计稿)

### Performance Optimization
- Canvas 使用 requestAnimationFrame
- 避免频繁 setState 导致重渲染
- 图片资源使用 base64 内联或 CDN
- 合理使用 useMemo/useCallback

### Responsive Design
Taro 自动将 rpx 转换为各平台适配单位：
- H5: rem
- 微信小程序: rpx
- 抖音小程序: rpx

## Future Enhancements

### Phase 1: MVP (当前)
- [x] 核心 3-Tiles 玩法
- [x] Canvas 图块渲染
- [x] 基础道具系统
- [x] 宝箱系统框架
- [ ] H5 Vercel 部署

### Phase 2: 完善体验
- [ ] 图块动画效果
- [ ] 音效系统
- [ ] 关卡进度保存
- [ ] 引导教程

### Phase 3: 小程序上线
- [ ] 微信小程序审核
- [ ] 抖音小程序审核
- [ ] 分享功能
- [ ] 排行榜

### Phase 4: Hero 模式
- [ ] 每日英雄关卡
- [ ] 特殊规则挑战
- [ ] 限时挑战
