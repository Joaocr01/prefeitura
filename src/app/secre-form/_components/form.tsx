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

// Schema específico para postagens
const postSchema = z.object({
  nome: z.string().trim().min(1, { message: 'Nome é obrigatório' })
})

const SecreForm = () => {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      nome: ''
    },
  })


  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    try {
      const response = await fetch('/api/secretarias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erro ao criar postagem')
      }


      const result = await response.json()
      toast.success(`Postagem "${result.nome}" criada com sucesso!`)
      router.refresh()
    } catch (error) {
      toast.error('Erro ao criar postagem')
      console.error(error)
    }
  }
return (
    <>
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
        control={form.control}
        name="nome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Título</FormLabel>
            <FormControl>
              <Input {...field} placeholder="nome da Secretaria" />
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

  </>

);

}


export default SecreForm
