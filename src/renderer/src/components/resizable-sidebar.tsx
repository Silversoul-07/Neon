"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { useAppStore } from "@/lib/store"

interface ResizableSidebarProps {
  children: ReactNode
  minWidth?: number
  maxWidth?: number
}

export function ResizableSidebar({ children, minWidth = 200, maxWidth = 400 }: ResizableSidebarProps) {
  const { sidebarWidth, setSidebarWidth, sidebarCollapsed } = useAppStore()
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return

      const newWidth = e.clientX
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, minWidth, maxWidth, setSidebarWidth])

  return (
    <div
      ref={sidebarRef}
      className="relative bg-sidebar border-r border-border flex-shrink-0 overflow-hidden"
      style={{ width: sidebarCollapsed ? "60px" : `${sidebarWidth}px` }}
    >
      {children}
      {!sidebarCollapsed && (
        <div
          className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-blue-500 transition-colors"
          onMouseDown={() => setIsResizing(true)}
        />
      )}
    </div>
  )
}
