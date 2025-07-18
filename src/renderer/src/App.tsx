"use client"

import { useEffect } from "react"
import { AppSidebar } from "./components/app-sidebar"
import { AppHeader } from "./components/app-header"
import { ImageGrid } from "./components/image-grid"
import { ImageViewer } from "./components/image-viewer"
import { TaggingDialog } from "./components/tagging-dialog"
import { ContextMenuProvider } from "./components/context-menu"
import { useAppStore } from "./lib/store"
import { SidebarProvider } from "./components/ui/sidebar"

const DesktopApp = () => {
  const { darkMode, selectedImage } = useAppStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  return (
    <SidebarProvider>
      <ContextMenuProvider>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            {!selectedImage && <AppHeader />}
            {selectedImage ? <ImageViewer /> : <ImageGrid />}
          </div>
          <TaggingDialog />
        </div>
      </ContextMenuProvider>
    </SidebarProvider>
  )
}

export default DesktopApp
