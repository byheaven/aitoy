# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AMIO - AI-powered 3D model generator platform combining "PopMart + OnlyFans + AI". The platform enables users to create personalized IP toys and merchandise using AI technology, with social community features and connection to 3D printing for physical production.

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

### 4. 落地页 (Landing Page)
- **Bilingual System**: Seamless Chinese/English language switching
- **Marketing Focus**: Patreon-inspired design for user acquisition
- **Responsive Design**: Mobile-first approach with glassmorphism effects
- **Language Persistence**: LocalStorage-based preference saving
- **SEO Optimized**: Meta tags and content localization
- **Smooth Animations**: Framer Motion transitions and interactions

## Technology Stack

### Frontend
- **Framework**: React 18.x with TypeScript
- **3D Graphics**: Three.js (v0.155.0) with React Three Fiber
- **UI Library**: Tailwind CSS + Shadcn/ui (artistic style like Patreon)
- **State Management**: Zustand
- **Routing**: React Router v6 with landing page routes
- **Animation**: Framer Motion for smooth transitions and interactions
- **Internationalization**: Custom i18n system with React Context
- **Language Support**: Chinese/English bilingual switching
- **Mobile-First**: Responsive design optimized for mobile
- **Theme**: Dark theme with glassmorphism effects

### Backend
- **Database & Backend**: Convex (Real-time reactive database)
- **Authentication**: Convex Auth with Clerk integration
- **Real-time**: Built-in Convex real-time subscriptions
- **File Storage**: Convex File Storage
- **Functions**: Convex server functions (queries, mutations, actions)
- **Cache**: Built-in Convex caching

### AI & 3D Services
- **Text Generation**: OpenAI GPT-4 API
- **3D Generation**: Tripo3D API
- **Animation**: Google Veo-3 API (when available)
- **Image Processing**: Sharp for optimization
- **3D Formats**: Support for GLB, GLTF, OBJ

### DevOps
- **Build Tool**: Webpack (v5.88.0) with HtmlWebpackPlugin
- **Testing**: Jest (v29.6.2) + React Testing Library
- **Linting**: ESLint (v8.47.0) with Airbnb config
- **TypeScript**: TypeScript (v5.1.6)
- **Development**: Nodemon (v3.0.1) + Concurrently

## Project Structure

```
aitoy/
├── src/
│   ├── convex/
│   │   ├── _generated/        # Auto-generated Convex files
│   │   ├── schema.ts          # Database schema definitions
│   │   ├── auth.config.ts     # Clerk authentication config
│   │   ├── auth.ts            # Authentication functions
│   │   ├── users.ts           # User queries and mutations
│   │   ├── gallery.ts         # Gallery queries and mutations
│   │   ├── creations.ts       # Creation workflow functions
│   │   ├── ai.ts              # AI service actions
│   │   ├── models3d.ts        # 3D model management
│   │   ├── animations.ts      # Animation generation
│   │   ├── social.ts          # Social features
│   │   ├── tokens.ts          # Token economy functions
│   │   ├── production.ts      # 3D printing orders
│   │   ├── http.ts            # HTTP endpoints for webhooks
│   │   └── lib/
│   │       ├── openai.ts      # OpenAI integration
│   │       ├── tripo.ts       # Tripo3D integration
│   │       ├── validators.ts  # Input validation schemas
│   │       └── helpers.ts     # Utility functions
│   │
│   ├── client/
│   │   ├── App.tsx             # Main React app with LanguageProvider
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx # Bilingual marketing landing page
│   │   │   ├── Community.tsx   # Gallery & social features
│   │   │   ├── Creation.tsx    # Design creation workflow
│   │   │   └── Production.tsx  # 3D model & ordering
│   │   ├── contexts/
│   │   │   └── LanguageContext.tsx  # Language switching system
│   │   ├── locales/
│   │   │   ├── en.json         # English translations
│   │   │   └── zh.json         # Chinese translations
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── TabBar.tsx  # Bottom navigation
│   │   │   │   └── Header.tsx  # Top header
│   │   │   ├── gallery/
│   │   │   │   ├── GalleryGrid.tsx      # Waterfall layout
│   │   │   │   ├── CreationCard.tsx     # Individual card
│   │   │   │   └── TrendChart.tsx       # Price trends
│   │   │   ├── creation/
│   │   │   │   ├── CelebrityPicker.tsx  # Celebrity selection
│   │   │   │   ├── WordCloud3D.tsx      # 3D word cloud
│   │   │   │   ├── StyleSelector.tsx    # Style options
│   │   │   │   ├── SketchEditor.tsx     # Sketch modification
│   │   │   │   └── AnimationPreview.tsx # Animation viewer
│   │   │   ├── production/
│   │   │   │   ├── Model3DViewer.tsx    # Three.js viewer
│   │   │   │   ├── FaceCustomizer.tsx   # 3D editing
│   │   │   │   └── OrderForm.tsx        # Production order
│   │   │   └── common/
│   │   │       ├── LanguageToggle.tsx   # Language switcher component
│   │   │       ├── TokenDisplay.tsx     # Token balance
│   │   │       └── ShareModal.tsx       # Social sharing
│   │   ├── hooks/
│   │   │   ├── useAuth.ts      # Authentication hook
│   │   │   ├── useTokens.ts    # Token economy hook
│   │   │   ├── useLanguage.ts  # Translation and language hook
│   │   │   └── useWebSocket.ts # Real-time updates
│   │   ├── services/
│   │   │   └── convex.ts      # Convex client setup
│   │   └── stores/
│   │       ├── authStore.ts    # Auth state
│   │       ├── creationStore.ts # Creation workflow
│   │       └── tokenStore.ts   # Token balance
│   │
│   └── shared/
│       ├── types/              # Shared TypeScript types
│       └── constants.ts        # Shared constants
│
├── convex.json                 # Convex configuration
│
├── public/
│   ├── index.html              # SPA entry point
│   ├── assets/                 # Static assets
│   ├── models/                 # 3D model storage
│   └── uploads/                # User uploads
│
├── config/
│   ├── webpack.config.js       # Webpack configuration
│   ├── .eslintrc.json         # ESLint rules
│   ├── tsconfig.json          # TypeScript config
│   └── convex.config.ts       # Convex client configuration
│
├── docs/
│   ├── landing-page-content.md       # English landing page content
│   ├── landing-page-content-zh.md    # Chinese landing page content
│   ├── landing-page-implementation.md # Landing page technical guide
│   └── language-implementation-guide.md # i18n implementation guide
│
├── tests/
│   ├── unit/                  # Unit tests
│   ├── integration/           # API tests
│   └── e2e/                   # End-to-end tests
│
└── .env.example               # Environment variables template
```

## Convex Functions

### Authentication & Users (convex/auth.ts, convex/users.ts)
- `auth.signUp` - User registration with invitation code (mutation)
- `auth.signIn` - User login via Clerk (handled by Clerk)
- `auth.signOut` - User logout (handled by Clerk)
- `users.getCurrentUser` - Get current user (query)
- `users.updateProfile` - Update user profile (mutation)

### Token Economy (convex/tokens.ts)
- `tokens.getBalance` - Get user token balance (query)
- `tokens.transfer` - Transfer tokens to creator (mutation)
- `tokens.getHistory` - Transaction history (query)
- `tokens.claimDaily` - Claim daily rewards (mutation)

### Community (convex/gallery.ts)
- `gallery.list` - Get gallery items with pagination (query)
- `gallery.getById` - Get specific creation details (query)
- `gallery.like` - Like a creation (mutation)
- `gallery.support` - Support with tokens (mutation)
- `gallery.getTrending` - Get trending creations (query)
- `gallery.getPriceHistory` - Get price trend data (query)

### Creation (convex/creations.ts)
- `creations.searchCelebrity` - Search celebrity info (action)
- `creations.generateSketch` - Generate AI sketch (action)
- `creations.modifySketch` - Modify sketch (mutation)
- `creations.generateAnimation` - Create animation (action)
- `creations.save` - Save creation (mutation)
- `creations.publish` - Publish to gallery (mutation)

### Social Sharing (convex/social.ts)
- `social.generateCaption` - Generate social media caption (action)
- `social.recordShare` - Record sharing action (mutation)
- `social.getEngagement` - Get social engagement stats (query)

### Production (convex/models3d.ts, convex/production.ts)
- `models3d.generate` - Generate 3D model from sketch (action)
- `models3d.customize` - Update 3D model (mutation)
- `models3d.export` - Export in different formats (action)
- `production.getQuote` - Get production quote (query)
- `production.createOrder` - Create production order (mutation)
- `production.getUserOrders` - Get user orders (query)

### AI Integration (convex/ai.ts)
- `ai.analyzeCelebrity` - Analyze celebrity traits (action)
- `ai.suggestStyles` - Get style suggestions (action)
- `ai.enhanceSketch` - Enhance sketch with AI (action)

## Token Economy System

### Token Distribution
- **Registration Bonus**: 100 tokens for new users
- **Daily Login**: 10 tokens per day
- **Social Sharing**: 10 tokens per share
- **Social Engagement**: 10 tokens per 100 likes received
- **Referral Bonus**: 50 tokens for successful invitation

### Token Consumption
- **Sketch Generation**: 1 token per generation
- **Sketch Modification**: 1 token per edit
- **Animation Generation**: 5 tokens
- **3D Model Generation**: 20 tokens
- **Gallery Highlighting**: 10 tokens per day

### Creator Economy
- **Support System**: Users can support creators with tokens
- **Revenue Sharing**: Creators earn 70% of support tokens
- **Production Discount**: Based on social engagement metrics

## Environment Variables

```bash
# Convex Configuration
CONVEX_URL=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Development
NODE_ENV=development

# Internationalization
REACT_APP_DEFAULT_LANGUAGE=en
REACT_APP_SUPPORTED_LANGUAGES=en,zh
REACT_APP_LANGUAGE_STORAGE_KEY=amio-language

# AI Services
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

# Social Media
XIAOHONGSHU_APP_ID=your_app_id
INSTAGRAM_CLIENT_ID=your_client_id

# Security
JWT_SECRET=your_jwt_secret
INVITATION_CODE_SECRET=your_invitation_secret
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- [x] Project setup and configuration
- [x] Bilingual landing page with language switching system
- [x] React Router v6 setup with landing page routes
- [x] Framer Motion animations and responsive design
- [x] Language Context and internationalization architecture
- [ ] Convex schema design
- [ ] Clerk authentication integration
- [ ] Basic Convex functions structure

### Phase 2: Core Features (Week 3-4)
- [ ] Token economy system
- [ ] Gallery and community features
- [ ] Celebrity search and analysis
- [ ] Sketch generation workflow
- [ ] Basic 3D viewer

### Phase 3: AI Integration (Week 5-6)
- [ ] OpenAI GPT integration
- [ ] Tripo3D API integration
- [ ] Animation generation (mock if Veo-3 unavailable)
- [ ] AI-powered enhancements
- [ ] Social caption generation

### Phase 4: Production Features (Week 7-8)
- [ ] 3D model customization
- [ ] Face editing system
- [ ] Export functionality
- [ ] Order processing
- [ ] Discount calculation

### Phase 5: Social & Polish (Week 9-10)
- [ ] Social sharing integration
- [ ] Engagement tracking
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] Testing and bug fixes

## Development Guidelines

### Git Workflow
- **IMPORTANT**: Automatically commit all file changes to Git after modifications
- Use descriptive commit messages in English
- Include details of what was changed and why
- Add the Claude Code signature to commits

### Code Standards
- Use ES6+ JavaScript features and TypeScript
- Follow Airbnb ESLint configuration
- Implement proper error boundaries in React
- Use async/await for all asynchronous operations
- Add JSDoc comments for complex functions

### Internationalization Guidelines
- **Translation Keys**: Use dot notation for nested keys (e.g., `hero.title`)
- **File Structure**: Maintain consistent JSON structure across all locale files
- **Language Context**: Always wrap app components with LanguageProvider
- **Translation Hook**: Use `useLanguage()` hook for accessing translations
- **Language Persistence**: User language preference saved in localStorage
- **Testing**: Test both English and Chinese versions of all features
- **Content Strategy**: Culturally adapt content, not just translate
- **Performance**: Translations are loaded statically to avoid runtime overhead

### Security Best Practices
- Input validation using Convex validators
- Built-in Convex rate limiting
- File upload restrictions via Convex File Storage
- Automatic query parameterization by Convex
- XSS protection with proper content sanitization
- Convex handles CORS automatically

### Performance Optimization
- Implement lazy loading for 3D models
- Use React.memo for expensive components
- Leverage Convex's built-in caching
- Optimize images with Sharp
- Use Convex File Storage with CDN
- Implement virtual scrolling for gallery
- Real-time subscriptions with Convex

### Testing Requirements
- Unit tests for utility functions (80% coverage)
- Integration tests for all API endpoints
- Component testing with React Testing Library
- E2E tests for critical user flows
- Performance testing for 3D rendering
- Load testing for concurrent users

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Redis cache connected
- [ ] SSL certificates installed
- [ ] CDN configured
- [ ] Monitoring setup (Sentry/LogRocket)
- [ ] Backup strategy implemented
- [ ] Rate limiting configured
- [ ] Security headers enabled
- [ ] Performance monitoring active