import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminHeader } from "@/components/admin/admin-header"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-muted/20 text-foreground">
        <AdminSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          <AdminHeader />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
