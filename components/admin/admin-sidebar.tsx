"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Car, PlusCircle, ExternalLink, LogOut, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { logoutAdminAction } from "@/actions/auth"

export function AdminSidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Kelola Armada",
      href: "/admin/cars",
      icon: Car,
      exact: false,
    },
    {
      label: "Tambah Mobil",
      href: "/admin/cars/new",
      icon: PlusCircle,
      exact: true,
    },
    {
      label: "Pengaturan",
      href: "/admin/settings",
      icon: Settings,
      exact: true,
    },
  ]

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/80 bg-card text-card-foreground md:flex md:flex-col">
      <div className="flex h-16 items-center gap-3 border-b border-border/80 px-6">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-black text-sm shadow-xs">
          N
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight leading-tight">
            Nabil Rental Mobil
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">
            Fleet Control Center
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href) && (item.href !== "/admin" || pathname === "/admin")

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border border-border/80 bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="size-3.5" />
            <span>Lihat Website</span>
          </span>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            Live
          </span>
        </Link>
      </div>

      <Separator />

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="size-9 border-border/80">
            <AvatarFallback className="bg-primary/10 text-primary font-bold">
              PT
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-xs font-semibold">PT Nabil Rental</span>
              <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
            </div>
            <span className="truncate text-[10px] text-muted-foreground">
              ptnabilrentalmobilpadang...
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => logoutAdminAction()}
          className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
          title="Keluar (Logout)"
        >
          <LogOut className="size-3.5" />
        </button>
      </div>
    </aside>
  )
}
