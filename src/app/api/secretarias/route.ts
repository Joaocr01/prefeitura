import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { nome } = await request.json()
    console.log('Nome recebido:', nome) // debug

    const post = await prisma.secretaria.create({
      data: { nome }
    })

    return NextResponse.json(post, { status: 201 })
  } catch (error: any) {
    console.error('❌ Erro ao criar secretaria:', error.message, error.stack)
    return NextResponse.json(
      { error: "Erro ao criar postagem", details: error.message },
      { status: 500 }
    )
  }

}
