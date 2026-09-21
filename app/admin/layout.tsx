import Link from "next/link"
import { Car, PlusCircle, LayoutDashboard, ExternalLink } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-stone-50 text-slate-900 dark:bg-[#070A10] dark:text-white">
      <aside className="hidden w-64 shrink-0 border-r border-stone-200 bg-white dark:border-white/10 dark:bg-[#0B0F17] md:flex md:flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-stone-200 px-6 dark:border-white/10">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#C5A059] to-[#9A7B38] text-slate-950 font-black text-base shadow-sm">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-tight">Nabil Rental</span>
            <span className="text-[10px] font-semibold text-[#92400E] dark:text-[#FDE68A]">
              Panel Manajemen CMS
            </span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-white/5"
          >
            <LayoutDashboard className="size-4 text-[#92400E] dark:text-[#C5A059]" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/admin/cars"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-white/5"
          >
            <Car className="size-4 text-[#92400E] dark:text-[#C5A059]" />
            <span>Kelola Armada Mobil</span>
          </Link>

          <Link
            href="/admin/cars/new"
            className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-stone-100 dark:text-slate-300 dark:hover:bg-white/5"
          >
            <PlusCircle className="size-4 text-[#92400E] dark:text-[#C5A059]" />
            <span>Tambah Mobil Baru</span>
          </Link>
        </nav>

        <div className="border-t border-stone-200 p-4 dark:border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 transition-colors hover:bg-stone-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
          >
            <span>Buka Website Publik</span>
            <ExternalLink className="size-3.5 text-slate-500" />
          </Link>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-4 dark:border-white/10 dark:bg-[#0B0F17] md:px-8">
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-[#C5A059] text-slate-950 font-black text-xs">
                N
              </div>
              <span className="text-xs font-bold">Admin CMS</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/admin/cars"
              className="rounded-lg px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-stone-100 dark:bg-white/10 dark:text-white"
            >
              Armada
            </Link>
            <Link
              href="/admin/cars/new"
              className="rounded-lg bg-[#25D366] px-2.5 py-1.5 text-xs font-bold text-white"
            >
              + Unit
            </Link>
            <Link
              href="/"
              target="_blank"
              className="rounded-lg p-1.5 text-slate-600 dark:text-slate-300"
            >
              <ExternalLink className="size-4" />
            </Link>
          </div>

          <div className="hidden md:block">
            <h1 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Nabil Rental Mobil Padang: Sistem Kendali Armada
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/cars/new"
              className="hidden md:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#C5A059] to-[#9A7B38] px-4 py-2 text-xs font-bold text-slate-950 shadow-sm transition-all hover:opacity-95 active:scale-98"
            >
              <PlusCircle className="size-4" />
              <span>Tambah Unit Mobil</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
