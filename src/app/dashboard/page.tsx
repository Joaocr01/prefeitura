//'use client'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import SignOutButton from './_components/sign-out-button'

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts'

const DashboardPage = async () => {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) redirect('/authentication')

  try {
    const userWithPosts = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        postagens: true,
      },
    })

    if (!userWithPosts?.postagens || userWithPosts.postagens.length === 0) {
      redirect('/post-form')
    }

    const postagens = userWithPosts.postagens

    // Cria dados para gráfico (exemplo por título)
    const chartData = postagens.map(post => ({
      titulo: post.titulo,
      valor: 1, // pode ser qualquer métrica futura
    }))

    return (
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-blue-600">Painel de Controle</h1>
        <p className="text-gray-700">Bem-vindo(a), {session.user.name} | {session.user.email}</p>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 text-blue-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Total de Postagens</h2>
            <p className="text-3xl">{postagens.length}</p>
          </div>
          <div className="bg-green-100 text-green-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Usuário</h2>
            <p>{session.user.name}</p>
          </div>
          <div className="bg-yellow-100 text-yellow-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">Último Post</h2>
            <p>{postagens[postagens.length - 1].titulo}</p>
          </div>
        </div>

        {/* Gráfico de barras */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Gráfico de Postagens</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="titulo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabela de Postagens */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Lista de Postagens</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-2 border">Título</th>
                  <th className="p-2 border">Descrição</th>
                  <th className="p-2 border">Fotógrafo</th>
                  <th className="p-2 border">Criado em</th>
                </tr>
              </thead>
              <tbody>
                {postagens.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="p-2 border">{post.titulo}</td>
                    <td className="p-2 border">{post.descricao}</td>
                    <td className="p-2 border">{post.fotografo}</td>
                    <td className="p-2 border">{new Date(post.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botão de logout */}
        <SignOutButton className="mt-6" />
      </div>
    )
  } catch (error) {
    console.error("Erro ao carregar postagens:", error)
    return <div className="text-red-600 p-4">Erro ao carregar postagens</div>
  }
}

export default DashboardPage
