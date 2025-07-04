import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session?.user) {
    throw new Error('Unautorized: User not found')
  }

  try {
    const data = await req.json()

    const newClinic = await prisma.clinic.create({
      data: {
        ...data,
        users: {
          connect: { id: session?.user.id },
        },
      },
    })
    return NextResponse.json(newClinic, { status: 201 })
  } catch (error) {
    console.error('Error adding clinics:', error)
    return NextResponse.json(
      { message: 'Falha ao adicionar clínicas' },
      { status: 500 }
    )
  }
}
