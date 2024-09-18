'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneCall, MessageSquare, Calendar, Clock, CheckCircle } from "lucide-react"
import Link from 'next/link'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'

const Header = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#">
        <PhoneCall className="h-6 w-6 mr-2" />
        <span className="font-bold">Cora</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
          Features
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="#use-cases">
          Use Cases
        </Link>
        <Link className="text-sm font-medium hover:underline underline-offset-4" href="https://tally.so/r/31vx9Q" target="_blank">
          Request service
        </Link>
      </nav>
    </header>
  )
}

enum USE_CASES {
  CUSTOMER_SURVEY = "CUSTOMER_SURVEY",
  DEBT_COLLECTION = "DEBT_COLLECTION",
  CUSTOMER_SERIVCE = "CUSTOMER_SERVICE"
}

enum LANG {
  NO = "NORWEGIAN",
  SWE = "SWEDISH",
  ENG = "ENGLISH"
}

export default function LandingPage() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [useCase, setUseCase] = useState<USE_CASES>(USE_CASES.CUSTOMER_SURVEY)
  const [lang, setLang] = useState(LANG.NO)
  const [isLoading, setIsLoading] = useState(false);

  const callApi = async (callNumber: string) => {
    setIsLoading(true);
    const response = await fetch('/api/call', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber: callNumber, useCase, lang })
    })
    const data = await response.json()
    console.log(data)
    setIsLoading(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    callApi(phoneNumber)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 m-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Calling for Everyone
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform your communication with our AI caller service. <br/> Personalized, efficient, and available 24/7. <br/> Outbound and Inbound.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex space-x-4">
                  <Button onClick={() => setUseCase(USE_CASES.CUSTOMER_SURVEY)} className={useCase === USE_CASES.CUSTOMER_SURVEY ? "bg-slate-300 text-gray-900" : ""}>❔ Customer Survey</Button>
                  <Button onClick={() => {setUseCase(USE_CASES.DEBT_COLLECTION)
                    setLang(LANG.NO)
                  }} className={useCase === USE_CASES.DEBT_COLLECTION ? "bg-slate-300 text-gray-900" : ""}>💰 Debt Collection</Button>
                  <Button onClick={() => {
                      setUseCase(USE_CASES.CUSTOMER_SERIVCE)
                      setLang(LANG.NO)
                  }} className={useCase === USE_CASES.CUSTOMER_SERIVCE ? "bg-slate-300 text-gray-900" : ""}>📞 Customer Service</Button>
                </div>
                <div className="flex space-x-4 mx-auto my-6">
                  <Button onClick={() => setLang(LANG.NO)} className={lang === LANG.NO ? "bg-slate-300 text-gray-900" : ""}>🇳🇴 Norwegian</Button>
                  {useCase === USE_CASES.CUSTOMER_SURVEY &&                  
                    <Button onClick={() => {
                        setLang(LANG.ENG);
                        setUseCase(USE_CASES.CUSTOMER_SURVEY);
                    }} className={lang === LANG.ENG ? "bg-slate-300 text-gray-900" : ""}>🇺🇸 English</Button>
                  }
                  {useCase === USE_CASES.CUSTOMER_SURVEY &&                  
                    <Button onClick={() => {
                      setLang(LANG.SWE)
                      setUseCase(USE_CASES.CUSTOMER_SURVEY);
                    }} className={lang === LANG.SWE ? "bg-slate-300 text-gray-900" : ""}>🇸🇪 Swedish</Button>
                  }
                </div>
              </div>
              <div className="w-full max-w-sm space-y-2 justify-center align-middle hidden">
                <p className="flex items-center pr-2">Use case </p>
                <Select defaultValue={USE_CASES.CUSTOMER_SURVEY}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a use case" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={USE_CASES.CUSTOMER_SURVEY}>Customer Survey</SelectItem>
                    <SelectItem value={USE_CASES.DEBT_COLLECTION}>Debt Collection</SelectItem>
                    <SelectItem value={USE_CASES.CUSTOMER_SERIVCE}>Customer Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    type="tel"
                    placeholder="Enter your phone number with country code"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" variant={"secondary"} disabled={isLoading}>{isLoading ? "In progress..." : "Receive call"}</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        <section id="use-cases" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 m-auto md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-gray-800 sm:text-4xl md:text-5xl text-center mb-8">
              Personas & Use Cases
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Business Professional</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Schedule meetings, screen calls, and manage your calendar with AI assistance.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Healthcare Provider</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Automate appointment reminders and handle basic patient inquiries efficiently.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Provide 24/7 support, answer FAQs, and escalate complex issues to human agents.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container m-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="flex items-start md:justify-center space-x-4">
                <MessageSquare className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="font-bold">Natural Language Processing</h3>
                  <p className="text-gray-500 dark:text-gray-400">Understand and respond to callers naturally.</p>
                </div>
              </div>
              <div className="flex items-start md:justify-center space-x-4">
                <Calendar className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="font-bold">Scheduling Integration</h3>
                  <p className="text-gray-500 dark:text-gray-400">Sync with your calendar for seamless scheduling.</p>
                </div>
              </div>
              <div className="flex items-start md:justify-center space-x-4">
                <Clock className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="font-bold">24/7 Availability</h3>
                  <p className="text-gray-500 dark:text-gray-400">Always on, ready to assist at any time.</p>
                </div>
              </div>
              <div className="flex items-start md:justify-center space-x-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="font-bold">Customizable Responses</h3>
                  <p className="text-gray-500 dark:text-gray-400">Tailor AI responses to fit your brand and needs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Cora Inc. All rights reserved.
        </p>
        {/*         
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        */}
      </footer>
    </div>
  )
}