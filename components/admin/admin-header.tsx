"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PlusCircle, ExternalLink, Car, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/common/theme-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function AdminHeader() {
  const pathname = usePathname()

  const getPageInfo = () => {
    if (pathname === "/admin/cars/new") {
      return { title: "Tambah Mobil Baru", category: "Armada", categoryHref: "/admin/cars" }
    }
    if (pathname.includes("/edit")) {
      return { title: "Edit Data Mobil", category: "Armada", categoryHref: "/admin/cars" }
    }
    if (pathname === "/admin/cars") {
      return { title: "Kelola Armada Mobil", category: "Katalog", categoryHref: "/admin" }
    }
    return { title: "Dashboard & Ringkasan", category: "Overview", categoryHref: "/admin" }
  }

  const { title, category, categoryHref } = getPageInfo()

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border/80 bg-card px-4 md:px-8">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-xs">
            N
          </div>
        </div>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={categoryHref} className="text-xs">
                {category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs font-semibold">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
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
