"use client"

import { ChevronRight, ChevronLeft } from "lucide-react"
import { MainNavigation } from "./main-navigation"
import { SmartAlbumsSection } from "./smart-albums-section"
import { useAppStore } from "@/lib/store"
import { ResizableSidebar } from "./resizable-sidebar"

export function AppSidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useAppStore()

  return (
    <ResizableSidebar>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && <h1 className="text-lg font-semibold">Gallery</h1>}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 rounded-md hover:bg-accent transition-colors ml-auto"
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <MainNavigation />
          <SmartAlbumsSection />
        </div>
      </div>
    </ResizableSidebar>
  )
}
