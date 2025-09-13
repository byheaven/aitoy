import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { LanguageProvider } from "@/contexts/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AMIO - AI-Powered 3D Toy Generator",
  description: "Create personalized IP toys and merchandise using AI technology. Transform ideas into unique 3D collectibles with our cutting-edge platform.",
  keywords: ["AI", "3D", "toys", "generation", "collectibles", "IP", "personalized"],
  authors: [{ name: "AMIO Team" }],
  openGraph: {
    title: "AMIO - AI-Powered 3D Toy Generator",
    description: "Create personalized IP toys and merchandise using AI technology",
    url: "https://demo.amio.love",
    siteName: "AMIO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AMIO - AI-Powered 3D Toy Generator",
    description: "Create personalized IP toys and merchandise using AI technology",
  },
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#ef4444',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
