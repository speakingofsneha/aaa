import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Homemade_Apple, Caveat, Hedvig_Letters_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

// Optimized local fonts with Next.js
const untitledSans = localFont({
  src: [
    {
      path: '../../public/fonts/Untitled Sans/TestUntitledSans-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Untitled Sans/TestUntitledSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Untitled Sans/TestUntitledSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Untitled Sans/TestUntitledSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-untitled-sans',
  display: 'swap',
  preload: true,
});

const compagnon = localFont({
  src: [
    {
      path: '../../public/fonts/Compagnon/Compagnon-Roman.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Compagnon/Compagnon-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Compagnon/Compagnon-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-compagnon',
  display: 'swap',
  preload: false, // Only preload if used above the fold
});

const homemadeApple = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-homemade-apple",
  preload: false, // Only used in footer
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat",
  preload: false, // Only used in blog
});

const hedvigLettersSerif = Hedvig_Letters_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hedvig",
  preload: false,
});

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "sneha",
    template: "%s | sneha's portfolio"
  },
  description: "interaction designer",
  authors: [{ name: "Sneha Kumar Vembu" }],
  creator: "Sneha Kumar Vembu",
  
  // Mobile and app metadata
  other: {
    "apple-mobile-web-app-title": "sne's portfolio",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#FBFBFC",
    "theme-color": "#FBFBFC"
  }
};

export const viewport: Viewport = {
  themeColor: "#FBFBFC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Typekit - Gelica font for Pearl case study */}
        <link rel="stylesheet" href="https://use.typekit.net/vuw0bky.css" />
        {/* Google Fonts - Instrument Sans for Pearl case study demos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{
          __html: `
            @supports (view-transition-name: none) {
              ::view-transition-old(root),
              ::view-transition-new(root) {
                animation-duration: 0.15s;
              }
            }
          `
        }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${untitledSans.variable} ${compagnon.variable} ${homemadeApple.variable} ${caveat.variable} ${hedvigLettersSerif.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log("what r u doing here?? if ur just being nosy, here's a cookie 🍪\\nif something is broken, AAAAAA pls text me at 8582261998 i will fix");
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
