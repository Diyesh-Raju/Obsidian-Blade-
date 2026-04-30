import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

// 1. Import the Luxury Navbar (sits OUTSIDE the scroll wrapper)
import { LuxuryNavbar } from "@/components/ui/luxury-navbar";

// 2. Import the Smooth Scroll Engine
import { SmoothScroll } from "@/components/ui/smooth-scroll";

// 3. Import the client-side theme body wrapper
import { ThemeBody } from "@/components/ThemeBody";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

// 4. Global Luxury SEO Metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Obsidian Blade",
    default: "Obsidian Blade | Ultra-Luxury Real Estate & Development",
  },
  description:
    "Discover unparalleled architectural mastery, ultra-luxury villas, and visionary commercial estates in the world\u2019s most exclusive districts. Obsidian Blade redefines premium living.",
  keywords: [
    "luxury real estate",
    "premium villas",
    "commercial estates",
    "Obsidian Blade",
    "high-end property",
    "ultra luxury homes",
    "architectural masterpiece",
    "exclusive developments",
  ],
  authors: [{ name: "Obsidian Blade" }],
  creator: "Obsidian Blade",
  metadataBase: new URL("https://www.obsidianblade.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.obsidianblade.com",
    siteName: "Obsidian Blade",
    title: "Obsidian Blade | Ultra-Luxury Real Estate & Development",
    description:
      "Discover unparalleled architectural mastery, ultra-luxury villas, and visionary commercial estates.",
    images: [
      {
        url: "/residential-1.jpg",
        width: 1200,
        height: 630,
        alt: "Obsidian Blade flagship luxury residence with panoramic ocean views",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Obsidian Blade | Ultra-Luxury Real Estate",
    description:
      "Discover unparalleled architectural mastery and visionary estates.",
    images: ["/residential-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <ThemeBody>
        {/* CRITICAL: Navbar stays OUTSIDE the Lenis scroll wrapper.
            Fixed positioning breaks inside Lenis's virtual scroll container. */}
        <LuxuryNavbar />

        {/* Everything else is wrapped in cinematic smooth scroll */}
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </ThemeBody>
    </html>
  );
}
