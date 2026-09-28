"use client"

import { useState } from "react"
import Link from "next/link"
import { loginAdminAction } from "@/actions/auth"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lock, Mail, ArrowLeft, Loader2, AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    const res = await loginAdminAction(formData)

    if (res && !res.success) {
      setErrorMessage(res.error || "Gagal masuk. Periksa email dan password.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="flex flex-col items-center text-center gap-2">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground font-black text-lg shadow-sm">
            N
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Nabil Rental Mobil Padang
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Portal Otentikasi Pengelola CMS
            </p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-base font-bold">Masuk ke Dashboard</CardTitle>
            <CardDescription className="text-xs">
              Gunakan email dan kata sandi admin yang telah didaftarkan.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 pt-0 flex flex-col gap-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="size-4" />
                  <AlertTitle className="text-xs font-semibold">Autentikasi Gagal</AlertTitle>
                  <AlertDescription className="text-xs mt-0.5">
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-xs font-medium">
                  Email Admin
                </Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="nama@nabilrent.com"
                    className="pl-8 text-xs"
                    defaultValue="ptnabilrentalmobilpadang@gmail.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password" className="text-xs font-medium">
                  Kata Sandi
                </Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="pl-8 text-xs"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-6 pt-0 flex flex-col gap-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-xs"
                size="default"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    <span>Memverifikasi Akun...</span>
                  </>
                ) : (
                  "Masuk ke Admin Panel"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Kembali ke Website Publik</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
