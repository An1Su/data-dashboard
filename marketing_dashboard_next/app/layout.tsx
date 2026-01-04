import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "./providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Marketing Dashboard",
  description: "Track your ad campaign and email marketing performance",
  icons: {
    icon: [
      {
        url: "target.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "target.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/target.png",
        type: "image/png",
      },
    ],
    apple: "/target.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
