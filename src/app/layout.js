import './globals.css'

export const metadata = {
  title: 'Amanda Moura Nail Designer',
  description: 'Unhas incríveis',
  viewport: {
    with: "device-width",
    initialScale: 1,
    maximumScale: 1
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
