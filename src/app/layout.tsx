// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Prefeitura Municipal de Batayporã',
  description: 'Site oficial da Prefeitura Municipal de Batayporã',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="min-h-[calc(100vh-140px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
