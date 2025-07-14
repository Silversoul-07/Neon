"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import { AppHeader } from "./components/app-header"
import { ImageGrid } from "./components/image-grid"

const DesktopApp = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [darkMode, setDarkMode] = useState(false)

  const images = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/300/200?random=${i + 1}`,
    title: `Image ${i + 1}`,
  }))

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <SidebarProvider>
        <div className="flex h-screen w-full bg-background">
          <AppSidebar />
          <SidebarInset>
            <AppHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              darkMode={darkMode}
              onToggleTheme={toggleTheme}
            />
            <ImageGrid images={images} searchQuery={searchQuery} />
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default DesktopApp
