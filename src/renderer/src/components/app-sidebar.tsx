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
      <div className="flex flex-col h-full bg-sidebar">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && <h1 className="text-lg font-semibold text-sidebar-foreground">Gallery</h1>}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors ml-auto"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-sidebar-foreground" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-sidebar-foreground" />
              )}
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
