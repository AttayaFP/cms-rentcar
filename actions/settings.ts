"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/server"

export interface BusinessSettings {
  business_name: string
  business_address: string
  whatsapp_number: string
  whatsapp_display: string
  seo_title: string
  seo_description: string
}

export async function getSettingsAction(): Promise<BusinessSettings> {
  try {
    const supabase = await createAdminClient()
    const { data } = await supabase.from("settings").select("*")

    const settingsMap: Record<string, string> = {}
    if (data) {
      data.forEach((item) => {
        settingsMap[item.key] = item.value
      })
    }

    return {
      business_name: settingsMap.business_name || "Nabil Rental Mobil Padang",
      business_address:
        settingsMap.business_address ||
        "Komplek Perumdam III/4, Tunggul Hitam, Kota Padang, Sumatera Barat",
      whatsapp_number: settingsMap.whatsapp_number || "6281276295523",
      whatsapp_display: settingsMap.whatsapp_display || "+62 812-7629-5523",
      seo_title:
        settingsMap.seo_title ||
        "Nabil Rental Mobil Padang: Sewa Mobil Lepas Kunci & Antar Jemput Bandara BIM",
      seo_description:
        settingsMap.seo_description ||
        "Rental mobil Padang terpercaya. Melayani sewa mobil lepas kunci dan dengan supir untuk rute Padang, Bukittinggi, Mandeh. Unit terawat siap jalan.",
    }
  } catch {
    return {
      business_name: "Nabil Rental Mobil Padang",
      business_address: "Komplek Perumdam III/4, Tunggul Hitam, Kota Padang, Sumatera Barat",
      whatsapp_number: "6281276295523",
      whatsapp_display: "+62 812-7629-5523",
      seo_title: "Nabil Rental Mobil Padang",
      seo_description: "Rental mobil Padang terpercaya.",
    }
  }
}

export async function updateSettingsAction(formData: FormData) {
  try {
    const supabase = await createAdminClient()

    const whatsapp_display = (formData.get("whatsapp_display") as string)?.trim() || "+62 812-7629-5523"
    let rawWa = whatsapp_display.replace(/\D/g, "")
    if (rawWa.startsWith("0")) {
      rawWa = "62" + rawWa.slice(1)
    }
    const whatsapp_number = rawWa || "6281276295523"

    const business_name = (formData.get("business_name") as string)?.trim() || "Nabil Rental Mobil Padang"
    const business_address = (formData.get("business_address") as string)?.trim() || "Komplek Perumdam III/4, Tunggul Hitam, Kota Padang, Sumatera Barat"
    const seo_title = (formData.get("seo_title") as string)?.trim() || ""
    const seo_description = (formData.get("seo_description") as string)?.trim() || ""

    const upsertRows = [
      { key: "business_name", value: business_name, updated_at: new Date().toISOString() },
      { key: "business_address", value: business_address, updated_at: new Date().toISOString() },
      { key: "whatsapp_number", value: whatsapp_number, updated_at: new Date().toISOString() },
      { key: "whatsapp_display", value: whatsapp_display, updated_at: new Date().toISOString() },
      { key: "seo_title", value: seo_title, updated_at: new Date().toISOString() },
      { key: "seo_description", value: seo_description, updated_at: new Date().toISOString() },
    ]

    const { error } = await supabase.from("settings").upsert(upsertRows)

    if (error) {
      return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/settings")
    return { success: true }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal menyimpan pengaturan"
    return { success: false, error: msg }
  }
}
