"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusCircle, ExternalLink, Car, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/common/theme-toggle"

export function AdminHeader() {
  const pathname = usePathname()

  const getPageInfo = () => {
    if (pathname === "/admin/cars/new") {
      return { title: "Tambah Mobil Baru", category: "Armada" }
    }
    if (pathname.includes("/edit")) {
      return { title: "Edit Data Mobil", category: "Armada" }
    }
    if (pathname === "/admin/cars") {
      return { title: "Kelola Armada Mobil", category: "Katalog" }
    }
    return { title: "Dashboard & Ringkasan", category: "Overview" }
  }

  const { title, category } = getPageInfo()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/80 bg-card px-4 md:px-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs">
            N
          </div>
        </div>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground font-medium">{category}</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-semibold text-foreground">{title}</span>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />

        {pathname !== "/admin/cars/new" && (
          <Button asChild size="sm">
            <Link href="/admin/cars/new" className="flex items-center gap-1.5">
              <PlusCircle className="size-3.5" />
              <span>Tambah Unit</span>
            </Link>
          </Button>
        )}

        <div className="flex items-center gap-1.5 md:hidden">
          <Link
            href="/admin"
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-foreground"
            title="Dashboard"
          >
            <LayoutDashboard className="size-4" />
          </Link>
          <Link
            href="/admin/cars"
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-foreground"
            title="Armada"
          >
            <Car className="size-4" />
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex size-8 items-center justify-center rounded-lg border border-border bg-background text-foreground"
            title="Web Publik"
          >
            <ExternalLink className="size-4" />
          </Link>
        </div>
      </div>
    </header>
  )
}
