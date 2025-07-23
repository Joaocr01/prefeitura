'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Postagem {
  id: string
  titulo: string
  createdAt: string
}

export default function PostagensTable({ postagens }: { postagens: Postagem[] }) {
    const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta postagem?')) return

    const res = await fetch(`/api/postagens/${id}`, { method: 'DELETE' })

    if (res.ok) {
      alert('Postagem removida com sucesso!')
      window.location.reload()
    } else {
      alert('Erro ao remover postagem')
    }
  }

  return (
    <>
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2 text-left">Título</th>
          <th className="border border-gray-300 p-2 text-left">Data</th>
          <th className="border border-gray-300 p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {postagens.map((post) => (
          <tr key={post.id} className="hover:bg-gray-100">
            <td className="border border-gray-300 p-2">{post.titulo}</td>
            <td className="border border-gray-300 p-2">
              {format(new Date(post.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
            </td>
            <td className="border border-gray-300 p-2 flex justify-center gap-2">
              <Link
                href={`/postagens/edit/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                Editar
              </Link>
              <button
                className="text-red-600 hover:underline"
                onClick={() => handleDelete(post.id)}
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
                          <Button
  variant="outline"
  onClick={() => {
    router.push('/post-form')
  }}
>
  Criar Nova Postagem
</Button>
    </>

  )


}
