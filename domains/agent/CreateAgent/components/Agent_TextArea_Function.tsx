"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { AgentData } from "../../types"

// Define the available function bubbles and their expanded text
const FUNCTION_BUBBLES = [
  {
    name: "getCustomer",
    expandedText: "use the function findSCollectCustomerByPhone",
    color: "blue",
  },
  {
    name: "acceptPayment",
    expandedText: "use the function acceptPayment",
    color: "green",
  },
  {
    name: "getPaymentOptions",
    expandedText: "use the function getPaymentOptions",
    color: "purple",
  },
  {
    name: "sendEmail",
    expandedText: "use the function sendEmail",
    color: "orange",
  },
  {
    name: "calculateTax",
    expandedText: "use the function calculateTax",
    color: "red",
  },
]

// Color mapping for bubbles
const BUBBLE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300" },
  green: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
  purple: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300" },
  orange: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
  red: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" },
}

type FunctionBubbleEditorProps = {
  agentData: AgentData;
  setAgentData: (data: AgentData) => void;
}

const FunctionBubbleEditor = ({ agentData, setAgentData }: FunctionBubbleEditorProps) => {
  const [rawText, setRawText] = useState("")
  const [inputText, setInputText] = useState(agentData.instructions)
  const editorRef = useRef<HTMLDivElement>(null)

  // Create a mapping of expanded text to function bubble for quick lookup
  const expandedTextMap = FUNCTION_BUBBLES.reduce(
    (map, bubble) => {
      map[bubble.expandedText.toLowerCase()] = bubble
      return map
    },
    {} as Record<string, (typeof FUNCTION_BUBBLES)[0]>,
  )

  // Insert a function bubble at the current cursor position
  const insertFunctionBubble = (functionBubble: (typeof FUNCTION_BUBBLES)[0]) => {
    if (!editorRef.current) return

    // Focus the editor if it's not already focused
    editorRef.current.focus()

    // Get the current selection
    const selection = window.getSelection()
    if (!selection || !selection.rangeCount) return

    const range = selection.getRangeAt(0)

    // Create the bubble element
    const bubble = createBubbleElement(functionBubble)

    // Insert the bubble at the current cursor position
    range.insertNode(bubble)

    // Move the cursor after the inserted bubble
    range.setStartAfter(bubble)
    range.setEndAfter(bubble)
    selection.removeAllRanges()
    selection.addRange(range)

    // Add a space after the bubble for better editing experience
    const spaceNode = document.createTextNode(" ")
    range.insertNode(spaceNode)
    range.setStartAfter(spaceNode)
    range.setEndAfter(spaceNode)
    selection.removeAllRanges()
    selection.addRange(range)

    // Ensure we update the raw text immediately
    setTimeout(updateRawText, 0)
  }

  // Create a bubble element for a function
  const createBubbleElement = (functionBubble: (typeof FUNCTION_BUBBLES)[0]) => {
    const bubble = document.createElement("span")
    const { bg, text, border } = BUBBLE_COLORS[functionBubble.color]
    bubble.className = `function-bubble ${bg} ${text} ${border} inline-flex items-center px-2 py-1 rounded-md text-sm font-medium mr-1 cursor-pointer border`
    bubble.contentEditable = "false"
    bubble.dataset.name = functionBubble.name
    bubble.dataset.expandedText = functionBubble.expandedText
    bubble.textContent = functionBubble.name
    return bubble
  }

  // Update the raw text representation
  const updateRawText = () => {
    if (!editorRef.current) return

    let text = ""
    const processNode = (node: Node) => {
      // Handle text nodes
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent || ""
      }
      // Handle function bubbles
      else if (node.nodeType === Node.ELEMENT_NODE && (node as Element).classList.contains("function-bubble")) {
        // Use the expanded text for function bubbles
        text += (node as HTMLElement).dataset.expandedText || ""
        // Add a space after for readability if needed
        if (!text.endsWith(" ")) {
          text += " "
        }
      }
      // Handle other element nodes by recursively processing their children
      else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(processNode)
      }
    }

    // Process all nodes in the editor
    Array.from(editorRef.current.childNodes).forEach(processNode)

    // Update the state with the processed text
    setRawText(text)
  }

  // Load raw text and convert function patterns to bubbles
  const loadRawText = () => {
    if (!editorRef.current || !inputText.trim()) return

    // Clear the current editor content
    editorRef.current.innerHTML = ""

    // Split the input text by line breaks
    const lines = inputText.split(/\r?\n/)

    // Process each line separately to preserve line breaks
    lines.forEach((line, lineIndex) => {
      // Create a document fragment for this line
      const lineFragment = document.createDocumentFragment()

      // Create a regex pattern to match all expanded function texts
      const patterns = Object.keys(expandedTextMap).map((text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      const pattern = new RegExp(`(${patterns.join("|")})`, "gi")

      let lastIndex = 0
      let match

      // Find all matches in the current line
      while ((match = pattern.exec(line)) !== null) {
        const [fullMatch] = match
        const matchIndex = match.index

        // Add text before the match
        if (matchIndex > lastIndex) {
          lineFragment.appendChild(document.createTextNode(line.substring(lastIndex, matchIndex)))
        }

        // Find the corresponding function bubble
        const functionBubble = expandedTextMap[fullMatch.toLowerCase()]
        if (functionBubble) {
          // Create and add the bubble
          const bubble = createBubbleElement(functionBubble)
          lineFragment.appendChild(bubble)

          // Add a space after the bubble
          lineFragment.appendChild(document.createTextNode(" "))
        } else {
          // If no match found (shouldn't happen), just add the text
          lineFragment.appendChild(document.createTextNode(fullMatch))
        }

        lastIndex = matchIndex + fullMatch.length
      }

      // Add any remaining text in this line
      if (lastIndex < line.length) {
        lineFragment.appendChild(document.createTextNode(line.substring(lastIndex)))
      }

      // Create a paragraph for this line
      const paragraph = document.createElement("div")
      paragraph.appendChild(lineFragment)

      // Add the paragraph to the editor
      if (editorRef.current) {
        editorRef.current.appendChild(paragraph)
      }

      // If this isn't the last line, add a line break
      if (lineIndex < lines.length - 1) {
        if (editorRef.current) {
          editorRef.current.appendChild(document.createElement("br"))
        }
      }
    })

    // Update the raw text
    updateRawText()

    // Clear the input field
    setInputText("")
  }

  useEffect(() => {
    // setAgentData({ ...agentData, instructions: rawText })
    if(inputText.trim()) {
        loadRawText();
    }
  }, [inputText])

  // Handle input in the editable div
  const handleInput = () => {
    // Use setTimeout to ensure the DOM has been updated
    setTimeout(updateRawText, 0)
  }

  // Handle pasting to strip formatting
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
    updateRawText()
  }

  // Handle keydown events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Special handling for backspace and delete to properly handle bubbles
    if (e.key === "Backspace" || e.key === "Delete") {
      const selection = window.getSelection()
      if (!selection || !selection.rangeCount) return

      const range = selection.getRangeAt(0)
      const startContainer = range.startContainer

      // Check if we're about to delete a bubble
      if (
        startContainer.nodeType === Node.ELEMENT_NODE &&
        (startContainer as Element).classList.contains("function-bubble")
      ) {
        // Let the default behavior happen, then update raw text
        setTimeout(updateRawText, 0)
      }
    }
  }

  // Initialize
  useEffect(() => {
    if (!editorRef.current) return

    // Make sure the editor is initialized with at least a space
    if (!editorRef.current.textContent?.trim()) {
      editorRef.current.innerHTML = "<p><br></p>"
    }

    // Initial update of raw text
    updateRawText()

    // Add click handler for bubbles
    const handleEditorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.classList.contains("function-bubble")) {
        // When clicking on a bubble, select the whole bubble
        const selection = window.getSelection()
        if (selection) {
          const range = document.createRange()
          range.selectNode(target)
          selection.removeAllRanges()
          selection.addRange(range)
        }
        e.stopPropagation() // Prevent other handlers from firing
      }
    }

    editorRef.current.addEventListener("click", handleEditorClick)

    // Force an update after a short delay to ensure everything is rendered
    setTimeout(updateRawText, 100)

    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener("click", handleEditorClick)
      }
    }
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="bg-gray-50 p-3 rounded-md">
        <h3 className="text-sm font-medium mb-2">Available Functions:</h3>
        <div className="flex flex-wrap gap-2">
          {FUNCTION_BUBBLES.map((bubble) => {
            const { bg, text, border } = BUBBLE_COLORS[bubble.color]
            return (
              <button
                key={bubble.name}
                className={`${bg} ${text} ${border} px-2 py-1 rounded-md text-sm font-medium border hover:opacity-80`}
                onClick={() => insertFunctionBubble(bubble)}
              >
                {bubble.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="editor" className="block text-sm font-medium">
          Edit your text:
        </label>
        <div
          ref={editorRef}
          id="editor"
          contentEditable
          className="w-full min-h-[200px] p-4 border rounded-md overflow-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          onInput={handleInput}
          onBlur={handleInput}
          onPaste={handlePaste}
          onKeyDown={handleKeyDown}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Raw Text Value (with expanded function calls):</h3>
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto max-h-[150px]">{rawText}</pre>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-sm font-medium mb-2">Load Raw Text:</h3>
        <div className="flex gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter raw text with function calls like 'use the function getCustomer'"
            className="flex-1 p-2 border rounded-md min-h-[80px] text-sm"
          />
          <button
            onClick={loadRawText}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md self-start"
          >
            Load
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Example: "First, use the function getCustomer and then use the function acceptPayment to process the order."
        </p>
      </div>
    </div>
  )
}

export default FunctionBubbleEditor;