import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'

import SecreForm from './_components/form'
import { X } from 'lucide-react' // Importe um ícone para fechar
import { auth } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'


const CreatePostPage = async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if (!session?.user) {
      redirect('/authentication')
    }
  return (
    <Dialog open>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Secretaria</Button>
      </DialogTrigger>

      {/* Overlay de fundo */}
      <div className="fixed inset-0 bg-black/50 z-50" />

      {/* Conteúdo do modal - FULLSCREEN */}
      <div className="fixed inset-0 z-50 flex flex-col bg-white p-0 overflow-auto">
        {/* Cabeçalho fixo */}
        <div className="sticky top-0 bg-white z-10 border-b p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">Adicionar Secretaria</h2>
              <p className="text-sm text-muted-foreground">
                Adicione uma Secretaria.
              </p>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </div>

        {/* Conteúdo rolável */}
        <div className="flex-1 overflow-y-auto p-6">
          <SecreForm />
        </div>

        </div>
    </Dialog>
  )
}

export default CreatePostPage
