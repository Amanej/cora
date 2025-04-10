'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from '@/domains/auth/state/AuthContext'
import { toast } from "@/hooks/use-toast";
import APP_CONFIG from "@/lib/config";
import { ROUTES } from "@/lib/routing";
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isAuthenticated } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(APP_CONFIG.backendUrl+"/users/signin", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (data.user.token) {
        const user = {approved: data.user.approved, email: data.user.email, name: data.user.name, max_calls: data.user.max_calls};
        login(data.user.token, user)
        router.push(ROUTES.MANAGE_AGENTS)
      } else {
        // Handle login error
        console.error('Login failed:', data.message)
        toast({
          title: "Login failed",
          description: "Could not login, please double check authentication or email aman@corafone.com",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Login error:', error)
      toast({
        title: "Login failed",
        description: "Could not login, please double check authentication or email aman@corafone.com",
        variant: "destructive",
      })
    }
  }

  if (isAuthenticated) {
    router.push(ROUTES.MANAGE_AGENTS)
  }

  return (
    <div className="m-auto">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit">Sign in</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
