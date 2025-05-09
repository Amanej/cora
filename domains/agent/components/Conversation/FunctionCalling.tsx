"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample function definitions - replace with your actual function schema
const functionDefinitions = {
  sendCustomer: {
    name: "SendCustomer",
    description: "Send customer information to an agent",
    parameters: [
      { name: "caseNumber", type: "string", required: true },
      { name: "priority", type: "string", required: false },
      { name: "notes", type: "string", required: false },
    ],
  },
  updateCase: {
    name: "UpdateCase",
    description: "Update an existing case",
    parameters: [
      { name: "caseNumber", type: "string", required: true },
      { name: "status", type: "string", required: true },
      { name: "assignedTo", type: "string", required: false },
    ],
  },
  createTicket: {
    name: "CreateTicket",
    description: "Create a new support ticket",
    parameters: [
      { name: "subject", type: "string", required: true },
      { name: "description", type: "string", required: true },
      { name: "category", type: "string", required: false },
    ],
  },
}

const FunctionCallerAdvanced = () => {
  const [selectedFunction, setSelectedFunction] = useState<string>("sendCustomer")
  const [trigger, setTrigger] = useState<string>("")
  const [parameters, setParameters] = useState<Record<string, string>>({})

  // Get the current function definition
  const currentFunction = selectedFunction
    ? functionDefinitions[selectedFunction as keyof typeof functionDefinitions]
    : null

  // Handle function selection change
  const handleFunctionChange = (value: string) => {
    setSelectedFunction(value)
    // Reset parameters when function changes
    setParameters({})
  }

  // Update parameter value
  const handleParameterChange = (name: string, value: string) => {
    setParameters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = () => {
    // Validate required parameters
    const missingParams = currentFunction?.parameters
      .filter((param) => param.required && !parameters[param.name])
      .map((param) => param.name)

    if (missingParams && missingParams.length > 0) {
      alert(`Missing required parameters: ${missingParams.join(", ")}`)
      return
    }

    // Handle the function call with the configured parameters
    console.log({
      function: selectedFunction,
      trigger,
      parameters,
    })
    // Add your actual function calling logic here
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Function Caller</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Select value={selectedFunction} onValueChange={handleFunctionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select function" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(functionDefinitions).map(([key, func]) => (
                <SelectItem key={key} value={key}>
                  {func.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="trigger">Trigger:</Label>
          <Textarea
            id="trigger"
            placeholder="Enter trigger phrase or condition"
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base font-medium">Parameters</Label>
          <div className="space-y-3 border rounded-md p-3">
            {currentFunction?.parameters.map((param) => (
              <div key={param.name} className="space-y-1">
                <Label htmlFor={param.name} className="flex items-center">
                  {param.name}
                  {param.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <Input
                  id={param.name}
                  placeholder={`Enter ${param.name}`}
                  value={parameters[param.name] || ""}
                  onChange={(e) => handleParameterChange(param.name, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced">
            <AccordionTrigger>Advanced Options</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="timeout">Timeout (ms):</Label>
                  <Input id="timeout" type="number" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retries">Retries:</Label>
                  <Input id="retries" type="number" placeholder="3" />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default FunctionCallerAdvanced;