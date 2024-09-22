'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Calendar, Clock, CheckCircle } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import clsx from 'clsx'

enum USE_CASES {
  CUSTOMER_SURVEY = "CUSTOMER_SURVEY",
  DEBT_COLLECTION = "DEBT_COLLECTION",
  SELGER = "SELGER"
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

  const isCustomerSurvey = useCase === USE_CASES.CUSTOMER_SURVEY;
  const isDebtCollection = useCase === USE_CASES.DEBT_COLLECTION;
  const isSelger = useCase === USE_CASES.SELGER;
  return (
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 m-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  AI-Powered Calling for Selger
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform your communication with our AI caller service. <br/> Personalized, efficient, and available 24/7. <br/> Outbound and Inbound.
                </p>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4">
                  <button className={clsx("border border-white rounded-md p-2 mb-4", isCustomerSurvey ? "bg-gray-200 text-black" : "")} onClick={() => setUseCase(USE_CASES.CUSTOMER_SURVEY)}>❔ Customer Survey</button>
                  <button className={clsx("border border-white rounded-md p-2 mb-4", isDebtCollection ? "bg-gray-200 text-black" : "")}
                    onClick={() => {setUseCase(USE_CASES.DEBT_COLLECTION)
                      setLang(LANG.NO)
                    }}
                  >💰 Debt Collection</button>
                  <button className={clsx("border border-white rounded-md p-2 mb-4", isSelger ? "bg-gray-200 text-black" : "")}
                    onClick={() => {
                      setUseCase(USE_CASES.SELGER)
                      setLang(LANG.NO)
                  }}
                  >📞 Selger</button>
                </div>
                <div className="flex space-x-4 mx-auto my-6">
                  <Button onClick={() => setLang(LANG.NO)} className={lang === LANG.NO ? "bg-slate-300 text-gray-900" : ""}>🇳🇴 Norwegian</Button>
                  
                    <Button onClick={() => {
                        setLang(LANG.ENG);
                        setUseCase(USE_CASES.CUSTOMER_SURVEY);
                    }} className={lang === LANG.ENG ? "bg-slate-300 text-gray-900" : ""}
                      disabled={!(useCase === USE_CASES.CUSTOMER_SURVEY)}
                    >🇺🇸 English</Button>      
                    <Button onClick={() => {
                      setLang(LANG.SWE)
                      setUseCase(USE_CASES.CUSTOMER_SURVEY);
                    }} 
                    disabled={!(useCase === USE_CASES.CUSTOMER_SURVEY)}
                    className={lang === LANG.SWE ? "bg-slate-300 text-gray-900" : ""}>🇸🇪 Swedish</Button>
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
                    <SelectItem value={USE_CASES.SELGER}>Selger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form onSubmit={handleSubmit} className="flex space-x-2">
                  <Input
                    type="tel"
                    placeholder="Phone number with country code"
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
                  <CardTitle>Backend operations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Automate following up suppliers, leads and internal resources.</p>
                </CardContent>
              </Card>
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
                  <CardTitle>Debt Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Handle debt collection, follow ups and inquiries.</p>
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
              <div className="flex items-start space-x-4">
                <MessageSquare className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="font-bold">Natural Language Processing</h3>
                  <p className="text-gray-500 dark:text-gray-400">Understand and respond to callers naturally.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Calendar className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="font-bold">System Integration</h3>
                  <p className="text-gray-500 dark:text-gray-400">Integrate with CRM and other customer, booking and payment solutions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="mt-1 h-6 w-6 flex-shrink-0 text-blue-500" />
                <div>
                  <h3 className="font-bold">24/7 Availability</h3>
                  <p className="text-gray-500 dark:text-gray-400">Always on, ready to assist at any time.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
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
  )
}