import PostForm from '@/components/ui/PostForm'
import prisma from '@/lib/prisma'

interface Props {
  params: { id: string }
}

export default async function EditPostagemPage({ params }: Props) {
  const postagem = await prisma.postagem.findUnique({
    where: { id: params.id }
  })

  if (!postagem) return <p>Postagem não encontrada</p>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Postagem</h1>
      <PostForm initialData={postagem} />
    </div>
  )
}
