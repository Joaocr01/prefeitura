'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function HomeClient({ postagens }: { postagens: any[] }) {
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited')
    if (!hasVisited) {
      setShowPopup(true)
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  return (
    <main className="max-w-2xl mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-6">Últimas Postagens</h1>

      <div className="space-y-8">
        {postagens.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{post.titulo}</h2>

            {post.foto && typeof post.foto === 'string' && post.foto.startsWith('http') && (
              <div className="relative h-64 mb-3">
                <Image
                  src={post.foto}
                  alt={post.titulo}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}

            <p className="text-gray-700">{post.descricao}</p>

            <p className="text-sm text-gray-500 mt-2">
              Postado em: {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {postagens.length === 0 && (
        <p className="text-center py-8 text-gray-500">
          Nenhuma postagem encontrada.
        </p>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center space-y-4">
            <div>
              <h2 className="text-lg font-bold">Projeto – Disciplina de Frameworks</h2>
              <p className="text-sm text-gray-600">MongoDB • TADES • Quinto Semestre</p>
              <p className="text-sm font-medium mt-1">Aluno: João Carlos Pereira de Souza</p>
            </div>

            <div className="text-sm text-gray-700">
              <p>Olá professor! 👋</p>
              <p>Clique abaixo para acessar o roteiro de uso completo do sistema.</p>
            </div>

            <a
              href="/roteiro"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Acessar Roteiro
            </a>

            <button
              onClick={() => setShowPopup(false)}
              className="block text-xs text-gray-500 hover:underline mx-auto mt-2"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
