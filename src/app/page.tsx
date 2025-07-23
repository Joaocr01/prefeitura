import prisma from '@/lib/prisma'
import Image from 'next/image'
import HomeClient from '../components/ui/HomeClient'

export default async function Home() {
  const postagens = await prisma.postagem.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (

    <>
    <HomeClient postagens={postagens} />
        <main className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Últimas Postagens</h1>

      <div className="space-y-8">
        {postagens.map((post) => (
          <div key={post.id} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">{post.titulo}</h2>

{post.foto && typeof post.foto === "string" && post.foto.startsWith("http") && (
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
    </main>
    </>

  )
}
