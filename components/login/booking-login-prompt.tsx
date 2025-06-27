"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface BookingLoginPromptProps {
  onLoginSuccess: () => void
  onRegisterSuccess: () => void
}

const BookingLoginPrompt: React.FC<BookingLoginPromptProps> = ({ onLoginSuccess, onRegisterSuccess }) => {
  const { toast } = useToast()

  const handleLogin = () => {
    // Simulate login process
    console.log("Login initiated")
    // Replace with actual login logic
    setTimeout(() => {
      console.log("Login successful")
      toast({
        title: "Login successful",
        description: "Welcome back to EventPro!",
      })
      onLoginSuccess()
    }, 1000)
  }

  const handleRegister = () => {
    // Simulate registration process
    console.log("Registration initiated")
    // Replace with actual registration logic
    setTimeout(() => {
      console.log("Registration successful")
      toast({
        title: "Registration successful",
        description: "Welcome to EventPro!",
      })
      onRegisterSuccess()
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <p className="text-lg mb-4">Please login or register to book this event.</p>
      <div className="flex space-x-4">
        <Button onClick={handleLogin}>Login</Button>
        <Button variant="secondary" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </div>
  )
}

export default BookingLoginPrompt
