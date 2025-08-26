import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'


export const metadata = {
  title: "Shrinidhi H V | Portfolio",
  description: "Portfolio of Shrinidhi H V - ML Engineer, Full Stack Developer, Data Scientist",
  metadataBase: new URL("https://shrinidhi-portfolio.vercel.app"), // change to your domain after deploy
  openGraph: {
    title: "Shrinidhi H V | Portfolio",
    description: "ML Engineer • Full Stack Developer • Data Scientist",
    url: "https://shrinidhi-portfolio.vercel.app",
    siteName: "Shrinidhi H V",
    images: [
      {
        url: "/og-image.png", // add one later for LinkedIn/Twitter preview
        width: 1200,
        height: 630,
        alt: "Shrinidhi H V Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shrinidhi H V | Portfolio",
    description: "ML Engineer • Full Stack Developer • Data Scientist",
    images: ["/og-image.png"],
  },
}




export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body>
{children}
</body>
</html>
)
}