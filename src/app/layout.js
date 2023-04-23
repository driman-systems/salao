import Header from '@/components/Header';
import './globals.css';
import { Jost } from "next/font/google";

const jost  = Jost({ subsets: ['latin'] });

export const metadata = {
  title: 'Amanda Moura Nail Designer',
  description: 'Unhas incríveis',
  viewport: {
    with: "device-width",
    initialScale: 1,
    maximumScale: 1
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icon.png',
    },
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#f0d4dd' },
      { media: '(prefers-color-scheme: dark)', color: '#f0d4dd' },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={jost.className}>
      <Header />
      <div className='w-full max-w-7xl m-auto px-2 lg:px-0'>
      {children}
      </div>
      </body>
    </html>
  )
}
