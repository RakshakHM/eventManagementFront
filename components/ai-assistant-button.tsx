"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AIChat } from "@/components/ai-chat"
import { Bot } from "lucide-react"

export function AIAssistantButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 rounded-full h-12 w-12 p-0 shadow-lg">
        <Bot className="h-6 w-6" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>AI Event Assistant</DialogTitle>
          </DialogHeader>
          <AIChat />
        </DialogContent>
      </Dialog>
    </>
  )
}
