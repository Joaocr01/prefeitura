// components/Header.tsx
import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Search } from 'lucide-react'

export default async function Header() {
  const secretarias = await prisma.secretaria.findMany({
    orderBy: { nome: 'asc' }
  })

  return (
    <header className="bg-blue-900 text-white">
      {/* Top bar */}
      <div className="bg-blue-800 py-1 px-4">
        {/* ... (igual ao seu código) */}
      </div>

      {/* Main header */}
      <div className="container mx-auto py-4 flex flex-col items-center">
        <h1 className="text-2xl font-bold">GOVERNO MUNICIPAL</h1>

        {/* Navigation */}
        <nav className="mt-4 w-full">
          <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { title: 'Batayporã', hasDropdown: true },
              { title: 'A Prefeitura', hasDropdown: true },
              { title: 'Secretarias', hasDropdown: true },
              { title: 'Saúde+' },
              { title: 'Transparência' },
              { title: 'Covid', hasDropdown: true },
              { title: 'Processos Seletivos' },
            ].map((item, index) => (
              <li key={index} className="group relative">
                <Link
                  href="#"
                  className="flex items-center py-2 hover:text-yellow-300 transition-colors"
                >
                  {item.title}
                  {item.hasDropdown && <span className="ml-1">▼</span>}
                </Link>

                {/* Só para 'Secretarias', mostra o dropdown */}
                {item.title === 'Secretarias' && (
                  <div className="absolute hidden group-hover:block bg-white text-blue-900 min-w-[200px] rounded shadow-lg z-10">
                    <ul className="py-2">
                      {secretarias.map((sec) => (
                        <li key={sec.id}>
                          <Link
                            href={`/secretarias/${sec.nome}`}
                            className="block px-4 py-2 hover:bg-blue-100"
                          >
                            {sec.nome}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Outros dropdowns genéricos */}
{item.hasDropdown && item.title !== 'Secretarias' && (
  <div className="absolute hidden group-hover:block bg-white text-blue-900 min-w-[200px] rounded shadow-lg z-10">
    <ul className="py-2">
      {[...Array(1)].map((_, i) => (
        <li key={i}>
          <Link
            href={
              item.title === 'Batayporã' && i === 0
                ? '/' // 👈 Subitem 1 de Batayporã vai para a raiz
                : '#'
            }
            className="block px-4 py-2 hover:bg-blue-100"
          >
            Ultimas Noticias
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}

              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
