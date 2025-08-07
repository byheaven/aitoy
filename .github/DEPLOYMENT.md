# AMIO GitHub Pages Deployment Setup

This document provides step-by-step instructions for setting up automatic deployment of the AMIO web demo to `demo.amio.love`.

## Prerequisites

1. GitHub repository with admin access
2. Custom domain `demo.amio.love` configured to point to GitHub Pages
3. Convex deployment for backend services
4. Clerk authentication setup

## GitHub Repository Setup

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** section
3. Under **Source**, select "GitHub Actions"
4. The workflow will automatically deploy on pushes to the `main` branch

### 2. Configure Repository Secrets

Add the following secrets in **Settings > Secrets and variables > Actions**:

- `NEXT_PUBLIC_CONVEX_URL`: Your Convex deployment URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key

### 3. Domain Configuration

The repository includes:
- `public/CNAME` file pointing to `demo.amio.love`
- `public/.nojekyll` file to prevent Jekyll processing

Ensure your DNS is configured:
```
Type: CNAME
Name: demo
Value: yourusername.github.io
```

## Workflow Details

### Build Process

The GitHub Actions workflow (`/.github/workflows/deploy.yml`) performs:

1. **Code Quality Checks**:
   - ESLint linting
   - TypeScript type checking
   - Jest unit tests with coverage

2. **Production Build**:
   - Webpack production build
   - Environment variable injection
   - Asset optimization and chunking

3. **Deployment**:
   - Uploads build artifacts to GitHub Pages
   - Deploys to `demo.amio.love`

### Build Configuration

Key webpack configurations for GitHub Pages:
- Public path set to root (`/`)
- Production-only CNAME and .nojekyll file copying
- Asset optimization with content hashing
- Code splitting for Three.js and vendor libraries

## Manual Deployment

To deploy manually:

```bash
# Install dependencies
npm ci

# Build for GitHub Pages
npm run build:pages

# The dist/ folder contains the deployable assets
```

## Troubleshooting

### Common Issues

1. **Assets not loading**: Check that `publicPath` is set correctly in webpack config
2. **Custom domain not working**: Verify CNAME file is present in build output
3. **Build failures**: Check repository secrets are configured correctly
4. **Jekyll conflicts**: Ensure `.nojekyll` file is included in build

### Debugging Steps

1. Check GitHub Actions logs for build errors
2. Verify environment variables are properly set
3. Test build locally with `npm run build:pages`
4. Ensure DNS configuration is correct for custom domain

## Environment Variables

Required for successful deployment:

### Production (GitHub Pages)
- `NEXT_PUBLIC_CONVEX_URL`: Convex deployment URL
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk authentication key

### Development
```bash
# Copy from .env.example
cp .env.example .env.local

# Edit with your development values
```

## Security Considerations

- Only public/client-side environment variables are included in the build
- Server-side secrets should never be exposed to the frontend
- Convex handles secure server-side operations
- Clerk manages authentication securely

## Performance Optimizations

The build includes:
- Code splitting for Three.js libraries
- Asset optimization and compression
- Content-based cache busting
- Vendor chunk separation
- Image and 3D model optimization