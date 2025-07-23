import prisma from '@/lib/prisma'
import PostagensTable from '@/components/ui/PostagensTable'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


export default async function PostagensPage() {
        const session = await auth.api.getSession({
          headers: await headers(),
        })

        if (!session?.user) {
          redirect('/authentication')
        }
  const postagens = await prisma.postagem.findMany({
    orderBy: { createdAt: 'desc' }
  })

  // Converta createdAt para string para passar para o Client Component
  const postagensSerialized = postagens.map(post => ({
    ...post,
    createdAt: post.createdAt.toISOString(),
  }))

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Publicações</h1>
      <PostagensTable postagens={postagensSerialized} />
    </div>
  )
}
