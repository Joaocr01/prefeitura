import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { auth } from '@/lib/auth'

import LoginForm from './components/login-form'

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (session?.user) {
    redirect('/clinic-form')
  }
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="register">
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AuthenticationPage
