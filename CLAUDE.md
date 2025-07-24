# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI-powered 3D model generator for creating trend toys. The project is in initial skeleton state with the architecture defined but implementation missing.

## Technology Stack

- **Backend**: Node.js with Express.js
- **3D Graphics**: Three.js (v0.155.0)
- **Build Tool**: Webpack
- **Testing**: Jest
- **Linting**: ESLint
- **TypeScript**: Support included

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

## Architecture

The codebase follows a modular Express.js architecture:

```
src/
├── server.js       # Main Express server with middleware setup
├── api/           # API route handlers (modelGenerator.js, aiIntegration.js needed)
├── client/        # Frontend code
├── models/        # Data models
├── shared/        # Shared utilities between client/server
└── utils/         # Server-side utilities

public/            # Static files served by Express
├── assets/        # Static assets
├── models/        # 3D model files
└── index.html     # Main application entry (needs creation)
```

## API Structure

- `/api/health` - Health check endpoint (implemented)
- `/api/generate/*` - Model generation routes (requires modelGenerator.js)
- `/api/ai/*` - AI integration routes (requires aiIntegration.js)
- `/` - Serves main application (requires public/index.html)

## Required Setup

Before development, these files need to be created:
1. `.env` file with PORT and any API keys
2. `webpack.config.js` for build process
3. `.eslintrc.js` or `.eslintrc.json` for linting
4. `tsconfig.json` for TypeScript support
5. `src/api/modelGenerator.js` and `src/api/aiIntegration.js` for API routes
6. `public/index.html` for the frontend entry point

## Development Notes

- Server uses environment variables via dotenv
- CORS is enabled for all origins
- Request body limit set to 10mb for handling 3D model data
- Error handling middleware provides detailed errors in development mode
- Static files served from `public/` directory