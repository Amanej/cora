'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, LogOut, PenSquare } from "lucide-react"
import SideBar from '@/components/global/Sidebar'
import Link from 'next/link'

export default function CreateEditAgent() {
  const [isEditing, setIsEditing] = useState(true) // Set to false for create mode

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Link href="/manage">
              <Button className="text-black" variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-sm font-light text-black">Agenter &gt; {isEditing ? "Kundeservice agenten min" : "Opprett kundeservice agent"}</p>
          </div>
          <Button variant="ghost">
            <LogOut className="mr-2 h-4 w-4" />
            Logg ut
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Elin</CardTitle>
            <p className="text-gray-500">Kundeservice agent</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefon nummer</Label>
                  <Input id="phone" placeholder="+47 46 16 46 87" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Inngående" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inngaende">Inngående</SelectItem>
                      <SelectItem value="utgaende">Utgående</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Hei, og velkommen til Advokatfirma Hansen! Mitt navn er Gry, og jeg er her for å hjelpe deg i dag. Hvordan kan jeg assistere deg?"
                  className="min-h-[200px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Samtale flyt</Label>
                <Button variant="outline">
                  <PenSquare className="mr-2 h-4 w-4" />
                  Rediger samtaleflyt
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Kunnskapsbank</Label>
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    FAQ.pdf
                  </Button>
                  <Button variant="outline" className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    Retningslinjer.pdf
                  </Button>
                  <Button variant="outline">Last opp</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Handlinger</h3>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span>Endre booking</span>
                    <PenSquare className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Slett booking</span>
                    <PenSquare className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Få pris forespørsel</span>
                    <PenSquare className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline">Test agent</Button>
                <Button>{isEditing ? 'Lagre endringer' : 'Opprett agent'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}