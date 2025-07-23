import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { titulo, foto, descricao, fotografo } = await request.json()

    const post = await prisma.postagem.create({
      data: { titulo, foto, descricao, fotografo },
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar postagem' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const postagens = await prisma.postagem.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(postagens, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar postagens' }, { status: 500 })
  }
}
