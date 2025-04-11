"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Loader2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Query {
  name: string
  function: string
  params: Record<string, string>
}

interface SavedQuery extends Query {
  id: string
}

export default function QueryBuilder() {
  const { toast } = useToast()
  const [queryName, setQueryName] = useState("Untitled Query")
  const [selectedFunction, setSelectedFunction] = useState("fetchCustomer")
  const [params, setParams] = useState<Record<string, string>>({
    customerIdentifier: "abc123",
  })
  const [rawOutput, setRawOutput] = useState<any>(null)
  const [formattingPrompt, setFormattingPrompt] = useState("")
  const [formattedOutput, setFormattedOutput] = useState<string>("")
  const [isRunning, setIsRunning] = useState(false)
  const [isFormatting, setIsFormatting] = useState(false)
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([])

  const functions = {
    fetchCustomer: async (params: Record<string, string>) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      return {
        customer: {
          name: params.customerIdentifier,
          age: 33,
          isUpToDateOnAllPayments: true,
          isEligibleForLoanPaymentFreeTerms: false,
        },
        applications: [
          {
            id: "23432-FF42342344-23432-23423",
            caseSystem: "M",
            productType: "LOAN",
            statusCode: "SIGNING",
            statusText: "Await signature from customers",
            applicationSummary: {
              loanAmount: 12024.5,
              maxApprovedAmount: 14000,
              currency: "SEK",
              agent: "SnabbCash AB",
              isRefinance: false,
              isExternalRefinance: false,
            },
            processData: {
              isPublicTaxDataAuthorizationGiven: true,
              isCreditCheckAuthorizationGiven: true,
              isApprovedByBank: true,
              isSelectedByCustomer: true,
              isDocumentationProvided: true,
              isRefinanceDetailsCompleted: false,
              areDocumentsSigned: false,
              completedSignatures: 1,
              requiredSignatures: 2,
              requiredDocuments: [],
              waitingFor: "Customers",
              nextStep: "SignDocuments",
              messageFromCaseWorker: "The cosigner is offshore without access to internet, until XXX",
              messageDate: "2025-01-01 12:49",
            },
          },
                    {
            id: "23432-FF42342344-23432-23424",
            caseSystem: "M",
            productType: "LOAN",
            statusCode: "PROCESSING",
            statusText: "Await signature from customers",
            applicationSummary: {
              loanAmount: 12024.5,
              maxApprovedAmount: 14000,
              currency: "SEK",
              agent: "Lendo AB",
              isRefinance: false,
              isExternalRefinance: false,
            },
            processData: {
              isPublicTaxDataAuthorizationGiven: true,
              isCreditCheckAuthorizationGiven: true,
              isApprovedByBank: true,
              isSelectedByCustomer: true,
              isDocumentationProvided: true,
              isRefinanceDetailsCompleted: false,
              areDocumentsSigned: false,
              completedSignatures: 1,
              requiredSignatures: 2,
              requiredDocuments: [],
              waitingFor: "Customers",
              nextStep: "SignDocuments",
              messageFromCaseWorker: "The cosigner is offshore without access to internet, until XXX",
              messageDate: "2025-01-01 12:49",
            },
          },
        ],
        products: {
          loanAccounts: [
            {
              accountNumber: "2002322",
              contractSystem: "CoreSE",
              agent: "NoWorries AB",
              balance: 233000,
              initialBalance: 350000,
              remainingTerms: 23,
              interest: 7.6,
              effectiveInterest: 8.1,
              minBargainInterest: null,
              reminderLevel: 0,
              numberOfRegularTerms: 10,
              closedDate: null,
              invoiceType: "E-INVOICE",
            },
          ],
          depositAccounts: [],
        },
      }
    },
    fetchOrders: async (params: Record<string, string>) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      return {
        orders: [
          {
            id: "ord-001",
            customerId: params.customerId,
            amount: 125.99,
            date: "2023-04-15",
            status: "delivered",
          },
          {
            id: "ord-002",
            customerId: params.customerId,
            amount: 79.5,
            date: "2023-05-22",
            status: "processing",
          },
        ],
      }
    },
    fetchProducts: async (params: Record<string, string>) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      return {
        products: [
          {
            id: "prod-001",
            name: "Laptop",
            price: 1299.99,
            category: params.category || "Electronics",
            inStock: true,
          },
          {
            id: "prod-002",
            name: "Headphones",
            price: 199.99,
            category: params.category || "Electronics",
            inStock: false,
          },
        ],
      }
    },
  }

  const functionParams = {
    fetchCustomer: [{ name: "customerIdentifier", type: "string", optional: false }],
    fetchOrders: [{ name: "customerId", type: "string", optional: false }],
    fetchProducts: [{ name: "category", type: "string", optional: true }],
  }

  const handleParamChange = (paramName: string, value: string) => {
    setParams((prev) => ({
      ...prev,
      [paramName]: value,
    }))
  }

  const runQuery = async () => {
    setIsRunning(true)
    try {
      const result = await functions[selectedFunction as keyof typeof functions](params)
      setRawOutput(result)
    } catch (error) {
      console.error("Error running query:", error)
      toast({
        title: "Error running query",
        description: "An error occurred while running the query.",
        variant: "destructive",
      })
    } finally {
      setIsRunning(false)
    }
  }

  const generateFormatting = async () => {
    if (!rawOutput) {
      toast({
        title: "No output to format",
        description: "Please run the query first to generate output.",
        variant: "destructive",
      })
      return
    }

    setIsFormatting(true)
    try {
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `Format the following JSON data according to this instruction: "${formattingPrompt}"\n\nJSON data:\n${JSON.stringify(rawOutput, null, 2)}`,
        system:
          "You are a helpful assistant that formats JSON data according to user instructions. Return only the formatted result without explanations or markdown formatting.",
      })

      setFormattedOutput(text)
    } catch (error) {
      console.error("Error generating formatting:", error)
      toast({
        title: "Error generating formatting",
        description: "An error occurred while generating the formatted output.",
        variant: "destructive",
      })
    } finally {
      setIsFormatting(false)
    }
  }

  const saveQuery = () => {
    const newQuery: SavedQuery = {
      id: Date.now().toString(),
      name: queryName,
      function: selectedFunction,
      params,
    }

    setSavedQueries((prev) => [...prev, newQuery])
    toast({
      title: "Query saved",
      description: `"${queryName}" has been saved successfully.`,
    })
  }

  const loadQuery = (query: SavedQuery) => {
    setQueryName(query.name)
    setSelectedFunction(query.function)
    setParams(query.params)
    setRawOutput(null)
    setFormattedOutput("")
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create Query</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="query-name">Query Name</Label>
            <Input
              id="query-name"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              placeholder="Enter query name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="function">Function</Label>
            <select
              id="function"
              value={selectedFunction}
              onChange={(e) => {
                setSelectedFunction(e.target.value)
                setParams({})
              }}
              className="w-full mt-1 p-2 border rounded-md"
            >
              <option value="fetchCustomer">Fetch Customer</option>
              <option value="fetchOrders">Fetch Orders</option>
              <option value="fetchProducts">Fetch Products</option>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Test Function</h3>
            {functionParams[selectedFunction as keyof typeof functionParams].map((param) => (
              <div key={param.name}>
                <Label htmlFor={param.name}>{param.name}</Label>
                <Input
                  id={param.name}
                  value={params[param.name] || ""}
                  onChange={(e) => handleParamChange(param.name, e.target.value)}
                  placeholder={`Enter ${param.name}`}
                  className="mt-1"
                  required={!param.optional}
                />
              </div>
            ))}

            <Button onClick={runQuery} disabled={isRunning} className="mt-2">
              {isRunning ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running...
                </>
              ) : (
                "Run"
              )}
            </Button>
          </div>

          {rawOutput && (
            <div className="space-y-4">
              <h3 className="font-medium">See Output</h3>
              <div className="bg-slate-100 p-4 rounded-md overflow-auto max-h-60">
                <pre className="text-sm">{JSON.stringify(rawOutput, null, 2)}</pre>
              </div>
            </div>
          )}

          {rawOutput && (
            <div className="space-y-4">
              <h3 className="font-medium">Generate Formatting</h3>
              <Textarea
                value={formattingPrompt}
                onChange={(e) => setFormattingPrompt(e.target.value)}
                placeholder="Describe how you want the output formatted (e.g., 'Show customer name and number of applications')"
                className="mt-1"
              />
              <Button onClick={generateFormatting} disabled={isFormatting}>
                {isFormatting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </div>
          )}

          {formattedOutput && (
            <div className="space-y-4">
              <h3 className="font-medium">Formatted Output</h3>
              <div className="bg-slate-100 p-4 rounded-md overflow-auto max-h-60">
                <pre className="text-sm whitespace-pre-wrap">{formattedOutput}</pre>
              </div>
            </div>
          )}

          {rawOutput && (
            <Button onClick={saveQuery} className="mt-4">
              <Save className="mr-2 h-4 w-4" />
              Save Query
            </Button>
          )}
        </CardContent>
      </Card>

      {savedQueries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {savedQueries.map((query) => (
                <div
                  key={query.id}
                  className="p-3 border rounded-md flex justify-between items-center hover:bg-slate-50 cursor-pointer"
                  onClick={() => loadQuery(query)}
                >
                  <div>
                    <h4 className="font-medium">{query.name}</h4>
                    <p className="text-sm text-slate-500">Function: {query.function}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Load
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

