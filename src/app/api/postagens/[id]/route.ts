import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

interface Params {
  params: { id: string }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const id = params.id
    const { titulo, foto, descricao, fotografo } = await request.json()

    const post = await prisma.postagem.update({
      where: { id },
      data: { titulo, foto, descricao, fotografo },
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro ao atualizar postagem' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const id = params.id

    await prisma.postagem.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Postagem deletada com sucesso' })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Erro ao deletar postagem' },
      { status: 500 }
    )
  }
}
