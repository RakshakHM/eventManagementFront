"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { getApiUrl } from "@/lib/utils"

function ConfirmEmailContent() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const confirmEmail = async () => {
      const token = searchParams.get("token")
      
      if (!token) {
        setError("Missing confirmation token")
        setIsLoading(false)
        return
      }

      try {
        const res = await fetch(getApiUrl(`/api/confirm-email?token=${token}`), {
          method: "GET",
        })
        
        const data = await res.json()
        
        if (!res.ok) {
          throw new Error(data.error || "Failed to confirm email")
        }
        
        setIsSuccess(true)
        toast({
          title: "Email confirmed!",
          description: "Your email has been confirmed successfully. You can now log in.",
        })
      } catch (error: any) {
        setError(error.message || "Failed to confirm email")
        toast({
          title: "Confirmation failed",
          description: error.message || "Failed to confirm email",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    confirmEmail()
  }, [searchParams, toast])

  if (isLoading) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Confirming your email...</h1>
            <p className="text-sm text-muted-foreground">Please wait while we confirm your email address.</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-destructive">Confirmation Failed</h1>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <div className="flex flex-col space-y-4">
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Register Again</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-green-600">Email Confirmed!</h1>
            <p className="text-sm text-muted-foreground">
              Your email has been confirmed successfully. You can now log in to your account.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <Button asChild>
              <Link href="/login">Go to Login</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function ConfirmEmailPage() {
  return (
    <Suspense fallback={
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Loading...</h1>
            <p className="text-sm text-muted-foreground">Please wait while we load the page.</p>
          </div>
        </div>
      </div>
    }>
      <ConfirmEmailContent />
    </Suspense>
  )
}