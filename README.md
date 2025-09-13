# AMIO - AI-Powered 3D Toy Generator

AMIO 是一个结合 PopMart + OnlyFans + AI 的创新平台，让用户通过 AI 技术创造个性化 IP 玩具和商品，享受社区互动并连接 3D 打印实现实体生产。

AMIO is an innovative platform combining PopMart + OnlyFans + AI, enabling users to create personalized IP toys and merchandise through AI technology, enjoy community interactions, and connect to 3D printing for physical production.

## 🚀 技术栈 / Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Custom Components
- **3D Graphics**: Three.js with React Three Fiber
- **Animation**: Framer Motion
- **Backend**: Convex (Real-time reactive database)
- **Authentication**: Clerk
- **State Management**: Zustand
- **Internationalization**: Custom i18n system (Chinese/English)

## 🌟 核心功能 / Core Features

### 1. 社区 (Community)
- 作品展示画廊和瀑布流布局
- 代币支持系统和创作者经济
- 价值趋势图表和热门内容
- 社交媒体集成分享

### 2. 创作 (Creation)
- AI 驱动的角色分析和草图生成
- 3D 词云可视化展示
- 多样化风格和材质选择
- 实时预览和编辑功能

### 3. 生产 (Production)
- 3D 模型生成和个性化定制
- 交互式 3D 模型编辑器
- 3D 打印订单处理系统
- 基于社交参与度的折扣系统

## 🛠️ 开发指南 / Development Guide

### 安装依赖 / Install Dependencies

```bash
npm install
```

### 环境变量配置 / Environment Setup

复制 `.env.example` 到 `.env.local` 并配置以下变量：

```bash
# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
CONVEX_DEPLOY_KEY=your_convex_deploy_key

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI Services
OPENAI_API_KEY=your_openai_key
TRIPO_API_KEY=your_tripo_key
```

### 启动开发服务器 / Start Development Server

```bash
# 启动 Next.js 和 Convex 开发服务器
npm run dev

# 或者分别启动
npm run dev:next    # Next.js 开发服务器
npm run dev:convex  # Convex 开发服务器
```

### 构建和部署 / Build & Deploy

```bash
# 代码质量检查
npm run lint
npm run typecheck

# 生产构建
npm run build

# 启动生产服务器
npm run start
```

## 📁 项目结构 / Project Structure

```
aitoy/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页 (LandingPage)
│   └── (app)/            # 应用路由组
│       ├── layout.tsx    # 应用布局 (TabBar)
│       ├── community/page.tsx
│       ├── creation/page.tsx
│       └── production/page.tsx
├── components/           # 共享组件
│   ├── layout/          # 布局组件
│   ├── gallery/         # 画廊组件
│   ├── creation/        # 创作组件
│   ├── production/      # 生产组件
│   └── common/          # 通用组件
├── contexts/            # React Context
├── lib/                # 工具函数和客户端
├── hooks/              # 自定义 hooks
├── locales/            # 国际化文件
├── convex/             # Convex 后端函数
└── public/             # 静态资源
```

## 🌐 国际化 / Internationalization

项目支持中英文双语切换：

- **English**: Default language for international users
- **中文**: 为中国用户优化的本地化版本

语言切换通过 localStorage 持久化，确保用户体验的连续性。

## 🎨 设计系统 / Design System

使用 Tailwind CSS 构建的现代化设计系统：

- **主色调**: Primary red (#ef4444) + Secondary blue (#0ea5e9)
- **深色主题**: 落地页使用深色背景配合玻璃形态效果
- **响应式设计**: 移动优先，支持所有设备尺寸
- **动画效果**: Framer Motion 驱动的流畅交互动画

## 🚀 部署选项 / Deployment Options

### Vercel (推荐)
```bash
npm run build
# 自动部署到 Vercel
```

### 静态导出 (GitHub Pages)
```bash
# 在 next.config.js 中启用静态导出
npm run build
```

## 📄 许可证 / License

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献 / Contributing

欢迎提交 Pull Request 和 Issue！

---

© 2024 AMIO. All rights reserved.