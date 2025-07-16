"use client"

import type React from "react"

import { X, Heart, Share, Download, Info, ChevronLeft, ChevronRight, Tag, Edit, Trash2 } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useContextMenu } from "./context-menu"
import { MetadataSidebar } from "./metadata-sidebar"
import { RecommendationsSection } from "./recommendations-section"

export function ImageViewer() {
  const {
    selectedImage,
    setSelectedImage,
    images,
    metadataSidebarCollapsed,
    setMetadataSidebarCollapsed,
    setShowTaggingDialog,
  } = useAppStore()

  const { showContextMenu } = useContextMenu()

  if (!selectedImage) return null

  const currentIndex = images.findIndex((img) => img.id === selectedImage.id)
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < images.length - 1

  const goToPrevious = () => {
    if (canGoPrev) {
      setSelectedImage(images[currentIndex - 1])
    }
  }

  const goToNext = () => {
    if (canGoNext) {
      setSelectedImage(images[currentIndex + 1])
    }
  }

  const handleImageContextMenu = (event: React.MouseEvent) => {
    showContextMenu(event, [
      { label: "Add to Favourites", icon: Heart, onClick: () => console.log("Add to favourites") },
      { label: "Manage Tags", icon: Tag, onClick: () => setShowTaggingDialog(true) },
      { label: "Share", icon: Share, onClick: () => console.log("Share") },
      { label: "Download", icon: Download, onClick: () => console.log("Download") },
      { separator: true },
      { label: "Edit", icon: Edit, onClick: () => console.log("Edit") },
      { label: "Delete", icon: Trash2, onClick: () => console.log("Delete") },
    ])
  }

  return (
    <div className="flex-1 flex bg-background relative overflow-hidden">
      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center relative p-8 bg-muted/20">
        <div className="relative max-w-full max-h-full">
          <img
            src={selectedImage.src || "/placeholder.svg"}
            alt={selectedImage.title}
            className="max-w-full max-h-full object-contain cursor-pointer rounded-lg shadow-lg"
            onContextMenu={handleImageContextMenu}
          />
        </div>

        {/* Navigation Arrows */}
        {canGoPrev && (
          <button
            onClick={goToPrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 p-3 bg-background border border-border rounded-full hover:bg-accent transition-colors shadow-lg"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>
        )}

        {canGoNext && (
          <button
            onClick={goToNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 p-3 bg-background border border-border rounded-full hover:bg-accent transition-colors shadow-lg"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>
        )}

        {/* Top Controls */}
        <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedImage(null)}
              className="p-2 bg-background border border-border rounded-lg hover:bg-accent transition-colors shadow-sm"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>

          <div className="bg-background border border-border rounded-lg p-1 shadow-sm">
            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-accent rounded-md transition-colors">
                <Heart className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => setShowTaggingDialog(true)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
              >
                <Tag className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-accent rounded-md transition-colors">
                <Share className="w-5 h-5 text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-accent rounded-md transition-colors">
                <Download className="w-5 h-5 text-muted-foreground" />
              </button>
              <button
                onClick={() => setMetadataSidebarCollapsed(!metadataSidebarCollapsed)}
                className="p-2 hover:bg-accent rounded-md transition-colors"
              >
                <Info className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>



        {/* Recommendations */}
        <RecommendationsSection />
      </div>

      {/* Metadata Sidebar */}
      {!metadataSidebarCollapsed && <MetadataSidebar />}
    </div>
  )
}
