"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

interface AIContextType {
  messages: Message[]
  sendMessage: (content: string) => void
  isLoading: boolean
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Sample responses for demo purposes
  const sampleResponses = [
    "I'd recommend checking out our premium photography services for your wedding. We have several highly-rated options available.",
    "Based on your event size, I suggest booking the Grand Convention Hall. It can accommodate up to 500 guests and offers excellent catering options.",
    "For flower decorations, our most popular choice for summer events is the 'Summer Bloom' package. Would you like to see some examples?",
    "The best time to book event services is typically 3-6 months in advance, especially for peak season dates.",
    "I can help you find services within your budget. What's your price range and what specific services are you looking for?",
  ]

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      const userMessage: Message = {
        id: uuidv4(),
        content,
        role: "user",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, userMessage])
      setIsLoading(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Get random response for demo
        const responseContent = sampleResponses[Math.floor(Math.random() * sampleResponses.length)]

        // Add assistant message
        const assistantMessage: Message = {
          id: uuidv4(),
          content: responseContent,
          role: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to get a response. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    },
    [toast],
  )

  return <AIContext.Provider value={{ messages, sendMessage, isLoading }}>{children}</AIContext.Provider>
}

export function useAI() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error("useAI must be used within an AIProvider")
  }
  return context
}
