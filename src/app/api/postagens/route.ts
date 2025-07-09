import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { z } from 'zod'

const postSchema = z.object({
  titulo: z.string().min(1, "Título é obrigatório"),
  foto: z.string().min(1, "URL da foto é obrigatória"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  fotografo: z.string().min(1, "Fotógrafo é obrigatório"),
})

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = postSchema.parse(body)

    const post = await prisma.postagem.create({
      data: {
        ...validatedData,
        userID: [session.user.id],
      },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Erro ao criar postagem:", error)
    return NextResponse.json(
      { error: "Erro ao criar postagem" },
      { status: 500 }
    )
  }
}
