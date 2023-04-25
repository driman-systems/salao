import Header from "@/components/Header"

export const metadata = {
  title: 'Bem vindo',
  description: 'Faça seu agendamento com toda comodidade',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="pt-BR">
      <body>
      <Header />
      <div className='w-full max-w-6xl m-auto px-2 xl:px-0'>
        {children}
      </div>
      </body>
    </html>
  )
}
