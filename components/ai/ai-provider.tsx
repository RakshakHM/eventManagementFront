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
    "I'd recommend checking out the Taj West End for your wedding reception. It's one of the most prestigious venues with beautiful gardens.",
    "For photography services in Indiranagar, there are several highly-rated options. Would you like me to suggest a few based on your budget?",
    "The best time for outdoor events is between October and February when the weather is pleasant. Avoid the monsoon season from June to September.",
    "For corporate events, I recommend checking out venues in Whitefield or Electronic City as they're close to many tech companies and have good facilities.",
    "Traditional decorations often include elements like banana leaves, jasmine flowers, and traditional rangoli designs. Would you like to see some examples?",
    "The average cost for a mid-range wedding venue is between ₹1,50,000 to ₹3,00,000 depending on the location and guest count.",
    "For a unique experience, you might want to check out heritage venues which offer a blend of history and modern amenities.",
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
