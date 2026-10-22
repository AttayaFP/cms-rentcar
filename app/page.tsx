import { createClient } from "@/lib/supabase/server"
import { getSettingsAction } from "@/actions/settings"
import { Navbar } from "@/components/layout/navbar"
import { HeroSequence } from "@/components/home/hero-sequence"
import { FeaturesSection } from "@/components/home/features-section"
import { FleetSection } from "@/components/fleet/fleet-section"
import { DestinationsSection } from "@/components/home/destinations-section"
import { TermsSection } from "@/components/home/terms-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { FaqSection } from "@/components/home/faq-section"
import { LocationSection } from "@/components/home/location-section"
import { Footer } from "@/components/layout/footer"
import { FloatingWhatsApp } from "@/components/common/floating-whatsapp"
import { MobileBottomBar } from "@/components/common/mobile-bottom-bar"
import { Car, Category } from "@/types/database"

export const revalidate = 60

export default async function HomePage() {
  let initialCars: Car[] = []
  let categories: Category[] = []

  const [settings, dbData] = await Promise.all([
    getSettingsAction(),
    (async () => {
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
        return {
          cars: (carsRes.data as Car[]) || [],
          categories: (categoriesRes.data as Category[]) || [],
        }
      } catch {
        return { cars: [], categories: [] }
      }
    })(),
  ])

  initialCars = dbData.cars
  categories = dbData.categories

  return (
    <div className="flex min-h-screen flex-col bg-[#FBFBF9] text-slate-900 dark:bg-[#070A10] dark:text-white pb-16 md:pb-0">
      <Navbar
        whatsappNumber={settings.whatsapp_number}
        whatsappDisplay={settings.whatsapp_display}
      />
      <main className="flex-1">
        <HeroSequence />
        <FeaturesSection />
        <FleetSection
          initialCars={initialCars}
          categories={categories}
          whatsappNumber={settings.whatsapp_number}
        />
        <DestinationsSection whatsappNumber={settings.whatsapp_number} />
        <TermsSection whatsappNumber={settings.whatsapp_number} />
        <TestimonialsSection />
        <FaqSection whatsappNumber={settings.whatsapp_number} />
        <LocationSection
          whatsappNumber={settings.whatsapp_number}
          whatsappDisplay={settings.whatsapp_display}
          address={settings.business_address}
        />
      </main>
      <Footer
        whatsappNumber={settings.whatsapp_number}
        whatsappDisplay={settings.whatsapp_display}
        address={settings.business_address}
      />
      <FloatingWhatsApp whatsappNumber={settings.whatsapp_number} />
      <MobileBottomBar whatsappNumber={settings.whatsapp_number} />
    </div>
  )
}
