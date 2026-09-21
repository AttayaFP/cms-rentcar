"use client"

import { type ReactNode } from "react"
import { ReactLenis } from "lenis/react"

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        touchMultiplier: 1.5,
        wheelMultiplier: 1,
        autoResize: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
