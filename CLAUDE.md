# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AMIO - AI-powered 3D model generator platform combining "PopMart + OnlyFans + AI". The platform enables users to create personalized IP toys and merchandise using AI technology, with social community features and connection to 3D printing for physical production.

**Current Status**: Landing page with bilingual support successfully deployed to GitHub Pages at demo.amio.love. Backend services and advanced features are planned for future development phases.

## Core Features

### 1. 社区 (Community) - Default Tab
- **Gallery**: Waterfall layout displaying user creations
- **Coin Support System**: Users can support creators with virtual coins
- **Price Trend Charts**: Track value changes of popular designs
- **Trending**: Showcase new and popular designs
- **Social Sharing**: Integration with Xiaohongshu and Instagram

### 2. 创作 (Creation)
- **Sketch Generation**:
  - Celebrity/character selection with domain tags (e.g., "golf")
  - AI-powered information retrieval and analysis using GPT
  - 3D word cloud visualization of related information
  - Style selection (blind box, plush toy, keychain, etc.)
  - Material selection (plush, vinyl, etc.)
  - Custom style upload or reference (e.g., "LABUBU")
- **Sketch Modification**: Edit and refine generated sketches
- **Animation Generation**: Create animations using Google Veo-3 API
- **Social Media Export**: Generate captions and hashtags for sharing

### 3. 生产 (Production)
- **3D Model Generation**: Convert AI sketches to 3D models
- **Face Customization System**: Interactive 3D model editing
- **Manufacturing Integration**: 3D printing order processing
- **Discount System**: Social media engagement-based pricing

### 4. 落地页 (Landing Page) - ✅ IMPLEMENTED
- **Bilingual System**: Seamless Chinese/English language switching with localStorage persistence
- **Marketing Focus**: Hero section with compelling value proposition and call-to-action
- **Responsive Design**: Mobile-first approach with glassmorphism effects and dark theme
- **Static Export**: Optimized for GitHub Pages deployment with Next.js static export
- **Smooth Animations**: Framer Motion transitions and scroll-triggered animations
- **Feature Showcase**: Three main sections highlighting AI creation, community, and production
- **Live Demo**: Accessible at demo.amio.love with full functionality

## Technology Stack

### Frontend
- **Framework**: Next.js 14.2.32 with React 18.3.1 and TypeScript 5.1.6
- **Architecture**: App Router with static export for GitHub Pages deployment
- **3D Graphics**: Three.js (v0.166.0) with React Three Fiber (v8.16.0) and Drei (v9.105.0)
- **UI Styling**: Tailwind CSS 3.4.0 with custom design system
- **State Management**: Zustand 4.5.0 for client state
- **Animation**: Framer Motion 11.0.0 for smooth transitions and interactions
- **Internationalization**: Custom i18n system with React Context
- **Language Support**: Chinese/English bilingual switching with localStorage persistence
- **Mobile-First**: Responsive design optimized for mobile with glassmorphism effects
- **Image Processing**: Sharp 0.33.0 for optimization

### Backend Services (Planned)
- **Database & Backend**: Convex 1.17.0 (Real-time reactive database)
- **Authentication**: Clerk integration (@clerk/nextjs 5.7.0)
- **Real-time**: Built-in Convex real-time subscriptions
- **File Storage**: Convex File Storage for 3D models and assets
- **Functions**: Convex server functions (queries, mutations, actions)
- **HTTP Client**: Axios 1.5.0 for external API calls

### AI & 3D Services (Planned Integration)
- **Text Generation**: OpenAI GPT-4 API integration
- **3D Generation**: Tripo3D API for model creation
- **Animation**: Google Veo-3 API (when available)
- **3D Formats**: Support for GLB, GLTF, OBJ, FBX files

### Development & Deployment
- **Build System**: Next.js with static export configuration
- **Development**: npm-run-all for parallel script execution
- **Testing**: Jest 29.6.2 with React Testing Library and jsdom environment
- **Linting**: ESLint 8.57.1 with Next.js and React configurations
- **Type Checking**: TypeScript with strict mode
- **Deployment**: GitHub Pages with automated CI/CD
- **Package Manager**: npm with dependency management

## Current Project Structure

**Status**: Landing page with bilingual support deployed to GitHub Pages. Backend services and advanced features planned for future development.

```
aitoy/
├── app/                        # Next.js App Router
│   ├── (app)/                  # Route group for main app pages
│   │   ├── layout.tsx         # Shared layout with TabBar navigation
│   │   ├── community/page.tsx # Gallery & social features (placeholder)
│   │   ├── creation/page.tsx  # Design creation workflow (placeholder)
│   │   └── production/page.tsx# 3D model & ordering (placeholder)
│   ├── layout.tsx             # Root layout with LanguageProvider
│   ├── page.tsx               # Landing page with bilingual support
│   ├── globals.css            # Global styles and Tailwind base
│   └── favicon.ico            # Site favicon
│
├── components/                # Reusable UI components
│   └── layout/
│       └── TabBar.tsx         # Bottom navigation component
│
├── contexts/                  # React contexts for global state
│   └── LanguageContext.tsx    # Language switching and i18n system
│
├── lib/                       # Shared utilities and providers
│   └── providers.tsx          # App providers (Clerk, Convex)
│
├── .github/                   # GitHub Actions and documentation
│   ├── workflows/
│   │   ├── deploy.yml         # GitHub Pages deployment pipeline
│   │   ├── claude.yml         # Claude Code integration
│   │   └── claude-code-review.yml # Automated code reviews
│   └── DEPLOYMENT.md          # Deployment documentation
│
├── convex/                    # Convex backend (planned)
│   └── (empty - future backend implementation)
│
├── docs/                      # Project documentation
│   ├── landing-page-content.md       # English landing page content
│   ├── landing-page-content-zh.md    # Chinese landing page content
│   ├── landing-page-implementation.md # Landing page technical guide
│   └── language-implementation-guide.md # i18n implementation guide
│
├── out/                       # Next.js static export output (generated)
│   └── (build artifacts for GitHub Pages)
│
├── Configuration Files:
├── next.config.js             # Next.js configuration with static export
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.json            # ESLint configuration
├── jest.config.js            # Jest testing configuration
├── postcss.config.mjs        # PostCSS configuration
├── package.json              # Dependencies and scripts
├── convex.json               # Convex configuration (for future use)
├── .env.example              # Environment variables template
└── CLAUDE.md                 # Project documentation for Claude Code
```

## Current Implementation Status

### ✅ Completed Features
- **Landing Page**: Fully responsive bilingual landing page with Framer Motion animations
- **Language System**: Chinese/English switching with localStorage persistence
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **Static Export**: Next.js static export configured for GitHub Pages deployment
- **CI/CD Pipeline**: Automated deployment with GitHub Actions
- **Basic Routing**: App Router structure with placeholder pages

### 🏗️ Planned Backend Features (Convex Integration)

#### Authentication & Users
- User registration and login via Clerk
- User profile management
- Session handling and security

#### Token Economy System
- Virtual token balance management
- Token rewards for engagement
- Creator revenue sharing
- Transaction history tracking

#### Community Features
- Gallery with waterfall layout
- Creation sharing and discovery
- Like and support systems
- Trending content algorithm
- Price trend tracking

#### Creation Workflow
- Celebrity/character search and analysis
- AI-powered sketch generation
- 3D word cloud visualization
- Style and material selection
- Sketch modification tools

#### Production Pipeline
- 3D model generation from sketches
- Interactive 3D model editing
- Export in multiple formats
- 3D printing order processing
- Manufacturing integration

#### AI & Social Integration
- OpenAI GPT-4 integration for content generation
- Tripo3D API for 3D model creation
- Social media caption generation
- Engagement tracking and analytics

## Planned Token Economy System

### Token Distribution (Future Implementation)
- **Registration Bonus**: 100 tokens for new users
- **Daily Login**: 10 tokens per day
- **Social Sharing**: 10 tokens per share
- **Social Engagement**: 10 tokens per 100 likes received
- **Referral Bonus**: 50 tokens for successful invitation

### Token Consumption (Future Implementation)
- **Sketch Generation**: 1 token per generation
- **Sketch Modification**: 1 token per edit
- **Animation Generation**: 5 tokens
- **3D Model Generation**: 20 tokens
- **Gallery Highlighting**: 10 tokens per day

### Creator Economy (Future Implementation)
- **Support System**: Users can support creators with tokens
- **Revenue Sharing**: Creators earn 70% of support tokens
- **Production Discount**: Based on social engagement metrics

## Environment Variables

### Current Configuration (Static Export)
```bash
# Development Environment
NODE_ENV=development

# Language System (Client-side)
NEXT_PUBLIC_DEFAULT_LANGUAGE=en
NEXT_PUBLIC_SUPPORTED_LANGUAGES=en,zh

# Static Export Configuration
NEXT_FORCE_STATIC_EXPORT=true
```

### Future Backend Configuration (When Implementing Convex/Clerk)
```bash
# Convex Configuration
CONVEX_DEPLOY_KEY=your_convex_deploy_key
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# AI Services (Server-side only)
OPENAI_API_KEY=your_openai_key
OPENAI_MODEL=gpt-4-turbo-preview
TRIPO_API_KEY=your_tripo_key
VEO3_API_KEY=your_veo3_key

# 3D Generation
MAX_MODEL_SIZE=10485760
SUPPORTED_FORMATS=glb,gltf,obj
DEFAULT_FORMAT=glb

# Token Economy
INITIAL_TOKENS=100
DAILY_REWARD=10
SHARE_REWARD=10
ENGAGEMENT_REWARD=10

# File Storage
UPLOAD_PATH=./public/uploads
MODELS_PATH=./public/models
MAX_FILE_SIZE=10485760

# Social Media Integration
XIAOHONGSHU_APP_ID=your_app_id
INSTAGRAM_CLIENT_ID=your_client_id

# Security
JWT_SECRET=your_jwt_secret
INVITATION_CODE_SECRET=your_invitation_secret
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## Implementation Roadmap

### ✅ Phase 1: Foundation & Landing Page (Completed)
- [x] Next.js 14 project setup with App Router
- [x] Bilingual landing page with Chinese/English switching
- [x] Static export configuration for GitHub Pages
- [x] Framer Motion animations and responsive design
- [x] Language Context and internationalization architecture
- [x] GitHub Actions CI/CD pipeline
- [x] Tailwind CSS with custom design system
- [x] TypeScript configuration and testing setup

### 🛠️ Phase 2: Backend Integration (Planned)
- [ ] Convex backend setup and schema design
- [ ] Clerk authentication integration
- [ ] User management system
- [ ] Basic database operations
- [ ] API route structure

### 🎨 Phase 3: Creation Tools (Planned)
- [ ] Celebrity/character search interface
- [ ] AI-powered sketch generation (OpenAI GPT-4)
- [ ] 3D word cloud visualization
- [ ] Style and material selection system
- [ ] Sketch modification tools

### 🎭 Phase 4: 3D & Production (Planned)
- [ ] Three.js 3D model viewer integration
- [ ] Tripo3D API for model generation
- [ ] Interactive 3D model editing
- [ ] Export functionality (GLB, GLTF, OBJ)
- [ ] 3D printing order processing

### 🌐 Phase 5: Community & Social (Planned)
- [ ] Token economy system implementation
- [ ] Gallery with waterfall layout
- [ ] Social sharing and engagement features
- [ ] Creator support and revenue sharing
- [ ] Mobile app optimization

### 🚀 Phase 6: Advanced Features (Future)
- [ ] Animation generation (Google Veo-3)
- [ ] Advanced AI enhancements
- [ ] Real-time collaboration
- [ ] International market expansion
- [ ] Analytics and performance monitoring

## Development Guidelines

### Git Workflow
- **IMPORTANT**: Automatically commit all file changes to Git after modifications
- Use descriptive commit messages in English
- Include details of what was changed and why
- Add the Claude Code signature to commits

### Deployment Verification Requirements
- **CRITICAL**: Always verify deployment success before considering any task complete
- **MANDATORY**: After every push to GitHub, MUST wait and verify that GitHub Actions passes completely before ending work

### Pre-deployment Checks
Run all CI/CD steps locally before pushing:
```bash
npm run lint          # ESLint code quality checks
npm run typecheck     # TypeScript type validation
npm test              # Jest test suite (with --passWithNoTests flag)
npm run build:pages   # Next.js static export build
```

### Post-deployment Verification
After pushing to main branch:
```bash
# Monitor GitHub Actions workflow
gh run list --limit 3
gh run view [run-id]  # Check specific workflow run
```

**Required Steps:**
- **REQUIRED**: Verify all pipeline steps pass: install → lint → typecheck → test → build → deploy
- **REQUIRED**: Confirm workflow status shows "completed success"
- **REQUIRED**: Test deployment at demo.amio.love
- **REQUIRED**: Verify language switching functionality works
- **REQUIRED**: Check mobile responsiveness and animations

### Error Resolution Protocol
1. **Identify**: Analyze GitHub Actions logs for root cause
2. **Fix**: Resolve issues locally with full CI/CD pipeline verification
3. **Test**: Run complete local build and test cycle
4. **Deploy**: Push fixes and monitor deployment success
5. **Verify**: Confirm live site functionality

**Critical Rule**: Never end work with failing GitHub Actions

### Code Standards

#### Language & Framework Standards
- **TypeScript**: Strict mode enabled, comprehensive type definitions
- **Next.js**: App Router pattern, file-based routing
- **React**: Functional components with hooks, proper error boundaries
- **Modern JavaScript**: ES2022+ features, async/await for asynchronous operations

#### Code Quality
- **ESLint**: Next.js and React configurations with TypeScript support
- **Formatting**: Consistent code style with automated linting
- **Comments**: JSDoc for complex functions and component props
- **Error Handling**: Graceful error boundaries and user feedback

#### Architecture Patterns
- **Component Structure**: Reusable, composable components in `/components`
- **State Management**: React Context for global state, local state for components
- **Type Safety**: Comprehensive TypeScript interfaces and type definitions
- **Performance**: React.memo for expensive components, code splitting for large features

### Internationalization Guidelines

#### Translation System Architecture
- **Translation Keys**: Dot notation for nested keys (e.g., `hero.title`, `nav.community`)
- **Storage**: Inline translations in LanguageContext for static export compatibility
- **Persistence**: User language preference saved in localStorage as `amio-language`
- **Context Provider**: LanguageProvider wraps entire application in root layout

#### Implementation Standards
- **Hook Usage**: Use `useLanguage()` hook for accessing translations and language state
- **Content Strategy**: Cultural adaptation, not just literal translation
- **Fallbacks**: Default to English if translation key not found
- **Performance**: Static loading of all translations to avoid runtime overhead

#### Testing & Quality
- **Bilingual Testing**: Verify functionality in both English and Chinese
- **Layout Testing**: Ensure UI accommodates different text lengths
- **Context Testing**: Verify LanguageProvider integration across all components
- **Persistence Testing**: Confirm localStorage language preference retention

### Security Best Practices
- Input validation using Convex validators
- Built-in Convex rate limiting
- File upload restrictions via Convex File Storage
- Automatic query parameterization by Convex
- XSS protection with proper content sanitization
- Convex handles CORS automatically

### Performance Optimization

#### Current Optimizations
- **Static Export**: Pre-rendered pages for fast initial load
- **Image Optimization**: Sharp integration for next/image (when needed)
- **Code Splitting**: Automatic Next.js code splitting by pages
- **CSS Optimization**: Tailwind CSS purging unused styles
- **Animation Performance**: Hardware-accelerated Framer Motion animations

#### Build Optimizations
- **Webpack Configuration**: Custom rules for 3D model files (GLB, GLTF, OBJ)
- **Bundle Analysis**: Monitor build output sizes and optimization opportunities
- **Asset Optimization**: Optimized loading of static assets
- **Tree Shaking**: Automatic removal of unused code

#### Future Performance Enhancements
- **Lazy Loading**: Dynamic imports for 3D models and heavy components
- **Virtual Scrolling**: Efficient gallery rendering for large datasets
- **Caching Strategy**: Convex built-in caching when backend implemented
- **CDN Integration**: Asset delivery optimization
- **Real-time Optimization**: Efficient WebSocket connections for live features

### Testing Strategy

#### Current Testing Setup
- **Framework**: Jest 29.6.2 with React Testing Library
- **Environment**: jsdom for browser simulation
- **Coverage**: Configured with `--passWithNoTests` for initial development
- **Mocks**: Browser API mocks for:
  - IntersectionObserver (Framer Motion compatibility)
  - ResizeObserver (responsive components)
  - matchMedia (responsive design tests)

#### Testing Requirements
- **Pre-commit**: All tests must pass before pushing to main
- **Language Testing**: Verify both English and Chinese versions
- **Responsive Testing**: Mobile and desktop layout verification
- **Animation Testing**: Framer Motion component functionality
- **Static Export Testing**: Build verification for GitHub Pages

#### Future Testing Expansion
- Unit tests for utility functions (80% coverage target)
- Integration tests for API endpoints (when backend implemented)
- Component testing with comprehensive user interactions
- E2E tests for critical user flows
- Performance testing for 3D rendering
- Cross-browser compatibility testing

## Deployment Status

### ✅ Current Deployment (GitHub Pages)
- [x] Static site deployed to demo.amio.love
- [x] Custom domain configured with CNAME
- [x] HTTPS/SSL certificates (GitHub Pages managed)
- [x] Automated CI/CD pipeline with GitHub Actions
- [x] Build process: lint → typecheck → test → build → deploy
- [x] Static asset optimization
- [x] Mobile-responsive design verified

### 🛠️ Future Backend Deployment Requirements
- [ ] Convex deployment and configuration
- [ ] Environment variables configured in production
- [ ] Database schema migrations
- [ ] Clerk authentication production setup
- [ ] API rate limiting and security headers
- [ ] Error monitoring (Sentry/LogRocket)
- [ ] Performance monitoring and analytics
- [ ] CDN configuration for 3D models and assets
- [ ] Backup and disaster recovery strategy
- [ ] Load testing for concurrent users