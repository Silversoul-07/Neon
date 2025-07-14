"use client"

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { MainNavigation } from "./main-navigation"
import { SmartTagsSection } from "./smart-tags-section"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold">Gallery</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation />
        <SmartTagsSection />
      </SidebarContent>
    </Sidebar>
  )
}
