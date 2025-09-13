'use client';

import { ReactNode } from 'react';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ClerkProvider } from '@clerk/nextjs';

// Create Convex client with fallback for build time
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || 'https://placeholder-convex-url.convex.dev';
const convex = new ConvexReactClient(convexUrl);

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  // For static generation without environment variables, skip providers
  if (!clerkPublishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey}
      afterSignInUrl="/"
      afterSignUpUrl="/"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <ConvexProvider client={convex}>
        {children}
      </ConvexProvider>
    </ClerkProvider>
  );
}