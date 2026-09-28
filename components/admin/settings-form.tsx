"use client"

import { useState } from "react"
import Image from "next/image"
import { updateSettingsAction, BusinessSettings } from "@/actions/settings"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Phone, Building2, MapPin, Search, CheckCircle2, AlertCircle, Loader2, ExternalLink } from "lucide-react"

interface SettingsFormProps {
  initialSettings: BusinessSettings
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [waInput, setWaInput] = useState(initialSettings.whatsapp_display || "+62 812-7629-5523")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage(null)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    formData.set("whatsapp_display", waInput)

    const res = await updateSettingsAction(formData)

    if (res.success) {
      setSuccessMessage("Pengaturan kontak bisnis dan nomor WhatsApp berhasil disimpan.")
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      setErrorMessage(res.error || "Gagal memperbarui pengaturan.")
    }

    setIsSubmitting(false)
  }

  const cleanWaNumber = waInput.replace(/\D/g, "")
  const testWaUrl = `https://wa.me/${cleanWaNumber.startsWith("0") ? "62" + cleanWaNumber.slice(1) : cleanWaNumber}?text=Halo%20Nabil%20Rental%20Padang%2C%20ini%20pesan%20uji%20coba%20dari%20panel%20admin.`

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-4xl">
      {successMessage && (
        <Alert variant="success">
          <CheckCircle2 className="size-4" />
          <AlertTitle>Pengaturan Disimpan</AlertTitle>
          <AlertDescription>
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Terjadi Kesalahan</AlertTitle>
          <AlertDescription>
            {errorMessage}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="p-5 border-b border-border/80">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Phone className="size-4 text-primary" />
            <span>1. Kontak WhatsApp Resmi</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Nomor ini menjadi tujuan seluruh klik tombol booking armada dan konsultasi di website.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="whatsapp_display" className="text-xs font-medium">
              Nomor WhatsApp / Hotline <span className="text-destructive">*</span>
            </Label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Input
                id="whatsapp_display"
                name="whatsapp_display"
                type="text"
                required
                value={waInput}
                onChange={(e) => setWaInput(e.target.value)}
                placeholder="+62 812-7629-5523"
                className="text-xs max-w-md font-mono"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                asChild
                className="text-xs shrink-0"
              >
                <a
                  href={testWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"
                >
                  <Image
                    src="/images/main/whatsapp.png"
                    alt="WA"
                    width={16}
                    height={16}
                    className="size-4 object-contain"
                  />
                  <span>Tes Link WhatsApp</span>
                  <ExternalLink className="size-3 ml-0.5" />
                </a>
              </Button>
            </div>
            <span className="text-[11px] text-muted-foreground">
              Format internasional (+62 812-xxxx-xxxx) atau 0812-xxxx-xxxx. Sistem otomatis membersihkan format saat membuat link direct chat.
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-5 border-b border-border/80">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Building2 className="size-4 text-primary" />
            <span>2. Identitas Bisnis &amp; Alamat Kantor</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Informasi alamat pool/kantor yang tampil pada footer dan seksi lokasi.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="business_name" className="text-xs font-medium">
              Nama Resmi Usaha / Bisnis
            </Label>
            <Input
              id="business_name"
              name="business_name"
              type="text"
              required
              defaultValue={initialSettings.business_name}
              placeholder="Contoh: Nabil Rental Mobil Padang"
              className="text-xs"
            />
          </div>

          <div className="flex flex-col gap-2 sm:col-span-2">
            <Label htmlFor="business_address" className="text-xs font-medium flex items-center gap-1.5">
              <MapPin className="size-3.5 text-muted-foreground" />
              <span>Alamat Kantor / Pool Armada</span>
            </Label>
            <Textarea
              id="business_address"
              name="business_address"
              rows={2}
              required
              defaultValue={initialSettings.business_address}
              placeholder="Contoh: Komplek Perumdam III/4, Tunggul Hitam, Kota Padang, Sumatera Barat"
              className="text-xs resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-5 border-b border-border/80">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Search className="size-4 text-primary" />
            <span>3. Konfigurasi SEO &amp; Meta Google</span>
          </CardTitle>
          <CardDescription className="text-xs">
            Judul dan deskripsi meta utama yang tampil di hasil pencarian Google.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="seo_title" className="text-xs font-medium">
              Judul Halaman Utama (SEO Title)
            </Label>
            <Input
              id="seo_title"
              name="seo_title"
              type="text"
              defaultValue={initialSettings.seo_title}
              placeholder="Judul SEO untuk Google"
              className="text-xs"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="seo_description" className="text-xs font-medium">
              Deskripsi Singkat Meta (SEO Description)
            </Label>
            <Textarea
              id="seo_description"
              name="seo_description"
              rows={2}
              defaultValue={initialSettings.seo_description}
              placeholder="Deskripsi ringkas layanan rental mobil"
              className="text-xs resize-none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          size="sm"
          className="min-w-[150px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="size-3.5" />
              <span>Simpan Pengaturan</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
