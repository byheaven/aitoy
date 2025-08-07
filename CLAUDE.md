# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered 3D model generator for creating trend toys. The project uses AI to generate creative 3D models suitable for trend toys, collectibles, and designer toys. Currently in initial development phase with core architecture established.

## Technology Stack

- **Backend**: Node.js with Express.js (v4.18.2)
- **3D Graphics**: Three.js (v0.155.0) for 3D rendering and manipulation
- **Real-time Communication**: WebSockets (ws v8.14.2)
- **HTTP Client**: Axios (v1.5.0) for API integration
- **File Handling**: Multer (v1.4.5) for multipart/form-data
- **Build Tool**: Webpack (v5.88.0) with HtmlWebpackPlugin
- **Testing**: Jest (v29.6.2)
- **Linting**: ESLint (v8.47.0)
- **TypeScript**: TypeScript (v5.1.6) with type definitions
- **Development**: Nodemon (v3.0.1) for auto-reload

## Essential Commands

```bash
# Development
npm run dev          # Start development server with nodemon on port 3000
npm start           # Run production server

# Build
npm run build       # Build for production (requires webpack.config.js)
npm run build:dev   # Build for development

# Quality Checks
npm run lint        # Run ESLint (requires .eslintrc config)
npm run typecheck   # TypeScript type checking (requires tsconfig.json)
npm test           # Run Jest tests

# Single test example (when tests exist)
npm test -- path/to/test.spec.js
```

## Project Architecture

The codebase follows a modular Express.js architecture with clear separation of concerns:

```
aitoy-3d-generator/
├── src/
│   ├── server.js       # Main Express server with middleware setup (implemented)
│   ├── api/           # API route handlers
│   │   ├── modelGenerator.js  # 3D model generation endpoints (to implement)
│   │   └── aiIntegration.js   # AI service integration (to implement)
│   ├── client/        # Frontend JavaScript/TypeScript code
│   │   ├── components/  # UI components
│   │   ├── services/    # API client services
│   │   └── utils/       # Client utilities
│   ├── models/        # Data models and schemas
│   ├── shared/        # Shared utilities between client/server
│   └── utils/         # Server-side utilities
│
├── public/            # Static files served by Express
│   ├── assets/        # Static assets (images, fonts, etc.)
│   ├── models/        # Generated/stored 3D model files
│   └── index.html     # Main application entry (to create)
│
├── tests/             # Test files
│   ├── unit/          # Unit tests
│   └── integration/   # Integration tests
│
└── config/            # Configuration files
    ├── webpack.config.js  # Webpack configuration (to create)
    ├── .eslintrc.json     # ESLint configuration (to create)
    └── tsconfig.json      # TypeScript configuration (to create)
```

## API Structure

### Implemented Endpoints
- `GET /api/health` - Health check endpoint returning server status

### Planned Endpoints
- **Model Generation**
  - `POST /api/generate/model` - Generate new 3D model from text prompt
  - `POST /api/generate/variation` - Create variations of existing model
  - `GET /api/generate/status/:id` - Check generation job status
  
- **AI Integration**
  - `POST /api/ai/prompt` - Process AI prompts for model generation
  - `POST /api/ai/enhance` - Enhance existing model with AI suggestions
  - `GET /api/ai/suggestions` - Get AI suggestions for model improvements

- **Model Management**
  - `GET /api/models` - List saved models
  - `GET /api/models/:id` - Get specific model details
  - `DELETE /api/models/:id` - Delete a model
  - `POST /api/models/export` - Export model in various formats (GLB, GLTF, OBJ)

## Implementation Checklist

### Core Files (Required)
- [x] `src/server.js` - Express server setup
- [ ] `public/index.html` - Main application entry point
- [ ] `.env` - Environment variables (PORT, API keys)
- [ ] `webpack.config.js` - Build configuration
- [ ] `.eslintrc.json` - Linting rules
- [ ] `tsconfig.json` - TypeScript configuration

### API Implementation
- [ ] `src/api/modelGenerator.js` - 3D model generation logic
- [ ] `src/api/aiIntegration.js` - AI service integration
- [ ] `src/models/Model.js` - Model data schema
- [ ] `src/models/User.js` - User data schema (if auth needed)

### Frontend Components
- [ ] `src/client/components/ModelViewer.js` - Three.js 3D viewer
- [ ] `src/client/components/PromptInput.js` - AI prompt interface
- [ ] `src/client/components/ModelControls.js` - 3D model manipulation controls
- [ ] `src/client/services/api.js` - API client service

## Development Guidelines

### Code Standards
- Use ES6+ JavaScript features
- Follow functional programming principles where appropriate
- Implement proper error handling with try-catch blocks
- Add JSDoc comments for all functions
- Use async/await for asynchronous operations

### 3D Model Generation
- Support multiple output formats (GLB, GLTF, OBJ)
- Implement texture and material generation
- Add model optimization for web display
- Include metadata for each generated model

### AI Integration Best Practices
- Implement rate limiting for AI API calls
- Cache AI responses when appropriate
- Validate and sanitize AI prompts
- Handle AI service errors gracefully
- Implement fallback mechanisms

### Security Considerations
- Validate all user inputs
- Implement file upload size limits (10MB default)
- Sanitize filenames for saved models
- Use environment variables for sensitive data
- Enable CORS with appropriate origins in production

## Environment Variables

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# AI Service Configuration
OPENAI_API_KEY=your_api_key_here
AI_MODEL=gpt-4-vision-preview
AI_MAX_TOKENS=2000

# 3D Generation Settings
MAX_MODEL_SIZE=10485760  # 10MB in bytes
SUPPORTED_FORMATS=glb,gltf,obj
DEFAULT_FORMAT=glb

# Storage Configuration
MODELS_PATH=./public/models
TEMP_PATH=./temp
```

## Testing Strategy

- Unit tests for individual functions and utilities
- Integration tests for API endpoints
- E2E tests for critical user workflows
- Performance tests for 3D rendering
- Load tests for AI generation endpoints

## Deployment Considerations

- Use PM2 or similar for process management
- Implement proper logging (Winston/Morgan)
- Set up monitoring and alerting
- Configure CDN for static assets
- Implement caching strategy for models
- Set up database for model metadata (MongoDB/PostgreSQL)