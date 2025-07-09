'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
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

const postSchema = z.object({
  titulo: z.string().trim().min(1, { message: 'Título é obrigatório' }),
  foto: z.string().trim().min(1, { message: 'URL da foto é obrigatória' }),
  descricao: z.string().trim().min(1, { message: 'Descrição é obrigatória' }),
  fotografo: z.string().trim().min(1, { message: 'Fotógrafo é obrigatório' }),
})

const PostForm = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      titulo: '',
      foto: '',
      descricao: '',
      fotografo: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    try {
      const response = await fetch('/api/postagens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: data.titulo,
          foto: data.foto,
          descricao: data.descricao,
          fotografo: data.fotografo,
          // userID será preenchido no backend com o usuário autenticado
        }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success(`Postagem "${result.titulo}" criada com sucesso!`)
        router.refresh()
      } else {
        toast.error(result?.message || 'Erro ao criar postagem.')
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado.')
    }
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

        <FormField
          control={form.control}
          name="fotografo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fotógrafo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nome do fotógrafo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            )}
            Criar Postagem
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

export default PostForm
