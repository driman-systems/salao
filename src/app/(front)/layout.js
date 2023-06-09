import Header from '@/components/Header';
import './globals.css';
import { Jost } from "next/font/google";
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';

const jost  = Jost({ subsets: ['latin'] });

export const metadata = {
  title: 'Amanda Moura Nail Designer',
  description: 'Unhas incríveis',
  themeColor:  '#AF1B51',
  viewport: {
    with: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.png',
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className='disable-select'>
      <body className={jost.className}>
      <Header />
      <div className='w-full m-auto xl:px-0 min-h-[50vh]'>
      {children}
      </div>
      <Footer />
      <Analytics />
      </body>
    </html>
  )
}
