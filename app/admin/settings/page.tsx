import { getSettingsAction } from "@/actions/settings"
import { SettingsForm } from "@/components/admin/settings-form"

export const revalidate = 0

export default async function AdminSettingsPage() {
  const settings = await getSettingsAction()

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          Pengaturan Kontak &amp; Bisnis
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Kelola nomor WhatsApp pemesanan, alamat pool operasional, dan parameter SEO publik secara dinamis.
        </p>
      </div>

      <SettingsForm initialSettings={settings} />
    </div>
  )
}
