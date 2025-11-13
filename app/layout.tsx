import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nemuin Aja",
  description: "Temukan UMKM lokal terbaik di Tasikmalaya",
  generator: "v0.app",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo-light.webp",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.webp",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          @supports (font-family: 'SF Pro Rounded') {
            .nemuinaja-text {
              font-family: 'SF Pro Rounded', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            }
          }
          @supports not (font-family: 'SF Pro Rounded') {
            .nemuinaja-text {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
            }
          }
          body {
            font-family: 'Inter', sans-serif;
          }
        `}</style>
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
