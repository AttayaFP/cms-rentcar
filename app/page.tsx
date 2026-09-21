import { createClient } from "@/lib/supabase/server"
import { Navbar } from "@/components/layout/navbar"
import { HeroSequence } from "@/components/home/hero-sequence"
import { FeaturesSection } from "@/components/home/features-section"
import { FleetSection } from "@/components/fleet/fleet-section"
import { DestinationsSection } from "@/components/home/destinations-section"
import { LocationSection } from "@/components/home/location-section"
import { Footer } from "@/components/layout/footer"
import { FloatingWhatsApp } from "@/components/common/floating-whatsapp"
import { MobileBottomBar } from "@/components/common/mobile-bottom-bar"
import { Car, Category } from "@/types/database"

export const revalidate = 60

export default async function HomePage() {
  let initialCars: Car[] = []
  let categories: Category[] = []

  try {
    const supabase = await createClient()
    const [carsRes, categoriesRes] = await Promise.all([
      supabase
        .from("cars")
        .select("*, images:car_images(*)")
        .order("created_at", { ascending: false }),
      supabase
        .from("categories")
        .select("*")
        .order("name", { ascending: true }),
    ])

    if (carsRes.data && carsRes.data.length > 0) {
      initialCars = carsRes.data as Car[]
    }
    if (categoriesRes.data && categoriesRes.data.length > 0) {
      categories = categoriesRes.data as Category[]
    }
  } catch {
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FBFBF9] text-slate-900 dark:bg-[#070A10] dark:text-white pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <HeroSequence />
        <FeaturesSection />
        <FleetSection initialCars={initialCars} categories={categories} />
        <DestinationsSection />
        <LocationSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileBottomBar />
    </div>
  )
}
