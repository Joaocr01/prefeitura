'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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

const postSchema = z.object({
  titulo: z.string().min(1, { message: 'Título é obrigatório' }),
  foto: z.string().min(1, { message: 'URL da foto é obrigatória' }),
  descricao: z.string().min(1, { message: 'Descrição é obrigatória' }),
})

type Postagem = z.infer<typeof postSchema> & { id?: string }

interface PostFormProps {
  initialData?: Postagem
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter()
  const isEdit = Boolean(initialData)

const form = useForm<Postagem>({
  resolver: zodResolver(postSchema),
  defaultValues: {
    titulo: initialData?.titulo ?? '',
    foto: initialData?.foto ?? '',
    descricao: initialData?.descricao ?? '',
  },
})


  const onSubmit = async (data: Postagem) => {
    try {
      const response = await fetch(
        isEdit ? `/api/postagens/${initialData?.id}` : '/api/postagens',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      )

      if (!response.ok) throw new Error('Erro ao salvar postagem')

      const result = await response.json()
      toast.success(
        `Postagem "${result.titulo}" ${isEdit ? 'atualizada' : 'criada'} com sucesso!`
      )
      router.push('/postagens')  // volta para lista ou onde quiser
      router.refresh()
    } catch (error) {
      toast.error(`Erro ao ${isEdit ? 'atualizar' : 'criar'} postagem`)
      console.error(error)
    }
  }

  const onDelete = async () => {
    if (!initialData?.id) return
    if (!confirm('Tem certeza que deseja excluir esta postagem?')) return

    try {
      const response = await fetch(`/api/postagens/${initialData.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Erro ao excluir postagem')

      toast.success('Postagem excluída com sucesso!')
      router.push('/postagens')
      router.refresh()
    } catch (error) {
      toast.error('Erro ao excluir postagem')
      console.error(error)
    }
  }

  const onCancel = () => {
    router.push('/postagens')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Título da postagem" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Foto</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://exemplo.com/foto.jpg" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Descrição completa da postagem"
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between items-center pt-4">
          {isEdit && (
            <Button variant="destructive" type="button" onClick={onDelete}>
              <Trash className="w-4 h-4 mr-1" />
              Excluir
            </Button>
          )}

          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancelar
            </Button>

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              )}
              {isEdit ? 'Atualizar' : 'Criar'} Postagem
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
