"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="size-10 rounded-xl border border-slate-200 bg-white/10 dark:border-white/10 dark:bg-white/5" />
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Ganti Tema Tampilan"
      className="group relative flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur-md transition-all hover:border-[#D4AF37] hover:text-[#D4AF37] dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-[#D4AF37]"
    >
      {isDark ? (
        <Sun className="size-4 text-[#FDE68A] transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-slate-700 transition-transform duration-300 group-hover:-rotate-12 dark:text-white" />
      )}
    </button>
  )
}
