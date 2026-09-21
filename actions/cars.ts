"use server"

import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/server"

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export async function createCarAction(formData: FormData) {
  const supabase = await createAdminClient()

  const name = formData.get("name") as string
  const category_id = (formData.get("category_id") as string) || null
  const transmission = (formData.get("transmission") as "Manual" | "Otomatis") || "Manual"
  const fuel_type = (formData.get("fuel_type") as string) || "Bensin"
  const seats = parseInt(formData.get("seats") as string) || 7
  const luggage = parseInt(formData.get("luggage") as string) || 2
  const price_self_drive = parseInt(formData.get("price_self_drive") as string) || 0
  const price_with_driver = parseInt(formData.get("price_with_driver") as string) || 0
  const status = (formData.get("status") as "Tersedia" | "Disewa" | "Perawatan") || "Tersedia"
  const is_featured = formData.get("is_featured") === "true"
  const description = (formData.get("description") as string) || ""
  const featuresRaw = formData.get("features") as string
  const features = featuresRaw ? featuresRaw.split(",").map((f) => f.trim()).filter(Boolean) : []

  const baseSlug = generateSlug(name)
  const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`

  const { data: newCar, error: carError } = await supabase
    .from("cars")
    .insert({
      name,
      slug,
      category_id,
      transmission,
      fuel_type,
      seats,
      luggage,
      price_self_drive,
      price_with_driver,
      status,
      is_featured,
      description,
      features,
    })
    .select()
    .single()

  if (carError || !newCar) {
    return { success: false, error: carError?.message || "Gagal menambahkan mobil" }
  }

  const files = formData.getAll("images") as File[]
  const validFiles = files.filter((f) => f && f.size > 0)

  for (let i = 0; i < validFiles.length; i++) {
    const file = validFiles[i]
    const ext = file.name.split(".").pop() || "jpg"
    const filePath = `cars/${newCar.id}/${Date.now()}-${i}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("nabil-rent")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: true,
      })

    if (!uploadError) {
      const { data: publicUrlData } = supabase.storage
        .from("nabil-rent")
        .getPublicUrl(filePath)

      await supabase.from("car_images").insert({
        car_id: newCar.id,
        image_url: publicUrlData.publicUrl,
        is_primary: i === 0,
        order_index: i,
      })
    }
  }

  revalidatePath("/")
  revalidatePath("/admin/cars")
  return { success: true, carId: newCar.id }
}

export async function updateCarAction(id: string, formData: FormData) {
  const supabase = await createAdminClient()

  const name = formData.get("name") as string
  const category_id = (formData.get("category_id") as string) || null
  const transmission = (formData.get("transmission") as "Manual" | "Otomatis") || "Manual"
  const fuel_type = (formData.get("fuel_type") as string) || "Bensin"
  const seats = parseInt(formData.get("seats") as string) || 7
  const luggage = parseInt(formData.get("luggage") as string) || 2
  const price_self_drive = parseInt(formData.get("price_self_drive") as string) || 0
  const price_with_driver = parseInt(formData.get("price_with_driver") as string) || 0
  const status = (formData.get("status") as "Tersedia" | "Disewa" | "Perawatan") || "Tersedia"
  const is_featured = formData.get("is_featured") === "true"
  const description = (formData.get("description") as string) || ""
  const featuresRaw = formData.get("features") as string
  const features = featuresRaw ? featuresRaw.split(",").map((f) => f.trim()).filter(Boolean) : []

  const { error: updateError } = await supabase
    .from("cars")
    .update({
      name,
      category_id,
      transmission,
      fuel_type,
      seats,
      luggage,
      price_self_drive,
      price_with_driver,
      status,
      is_featured,
      description,
      features,
    })
    .eq("id", id)

  if (updateError) {
    return { success: false, error: updateError.message }
  }

  const files = formData.getAll("images") as File[]
  const validFiles = files.filter((f) => f && f.size > 0)

  if (validFiles.length > 0) {
    const { count } = await supabase
      .from("car_images")
      .select("*", { count: "exact", head: true })
      .eq("car_id", id)

    const startIndex = count || 0

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i]
      const ext = file.name.split(".").pop() || "jpg"
      const filePath = `cars/${id}/${Date.now()}-${i}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from("nabil-rent")
        .upload(filePath, file, {
          contentType: file.type,
          upsert: true,
        })

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from("nabil-rent")
          .getPublicUrl(filePath)

        await supabase.from("car_images").insert({
          car_id: id,
          image_url: publicUrlData.publicUrl,
          is_primary: startIndex === 0 && i === 0,
          order_index: startIndex + i,
        })
      }
    }
  }

  revalidatePath("/")
  revalidatePath("/admin/cars")
  return { success: true }
}

export async function deleteCarAction(id: string) {
  const supabase = await createAdminClient()

  await supabase.from("car_images").delete().eq("car_id", id)
  const { error } = await supabase.from("cars").delete().eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  revalidatePath("/admin/cars")
  return { success: true }
}

export async function updateCarStatusAction(
  id: string,
  status: "Tersedia" | "Disewa" | "Perawatan"
) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from("cars")
    .update({ status })
    .eq("id", id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/")
  revalidatePath("/admin/cars")
  return { success: true }
}
