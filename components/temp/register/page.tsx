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
import APP_CONFIG from "@/lib/config";
import { ROUTES } from "@/lib/routing";
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await fetch(APP_CONFIG.backendUrl+"/users/register", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (data.token) {
        const user = {approved: data.user.approved, email: data.user.email, name: data.user.name, max_calls: data.user.max_calls || 1};
        login(data.token, user)
        router.push(ROUTES.MANAGE_AGENTS)
      } else {
        // Handle login error
        console.error('Login failed:', data.message);
        // Show
        setError("Could not register. Send an email to support@corafone.com if you need help.")
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="m-auto">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your email below to register to your account.
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
          {error && (
            <div className="px-6 pb-2">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>{isLoading ? "Registering..." : "Register"}</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
