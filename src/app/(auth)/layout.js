import { Jost } from "next/font/google";

const jost  = Jost({ subsets: ['latin'] });

export const metadata = {
  title: 'Nail Designer | Login',
  description: 'Faça login para fazer seu agendamento',
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
    <html lang="pt-BR">
      <body className={jost.className}>{children}</body>
    </html>
  )
}
