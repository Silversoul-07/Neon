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
    <div className="flex-1 flex bg-black relative">
      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center relative">
        <img
          src={selectedImage.src || "/placeholder.svg"}
          alt={selectedImage.title}
          className="max-w-full max-h-full object-contain cursor-pointer"
          onContextMenu={handleImageContextMenu}
        />

        {/* Navigation Arrows */}
        {canGoPrev && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass-strong dark:glass-strong-dark rounded-full text-white transition-all hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {canGoNext && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass-strong dark:glass-strong-dark rounded-full text-white transition-all hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedImage(null)}
              className="p-3 glass-strong dark:glass-strong-dark rounded-full text-white transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="glass-strong dark:glass-strong-dark rounded-full p-2">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowTaggingDialog(true)}
                className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <Tag className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                <Share className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full text-white transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMetadataSidebarCollapsed(!metadataSidebarCollapsed)}
                className="p-2 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <Info className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Image Info Overlay */}
        <div className="absolute bottom-20 left-4">
          <div className="glass-strong dark:glass-strong-dark rounded-xl p-4 text-white max-w-md">
            <h2 className="text-lg font-semibold mb-1">{selectedImage.title}</h2>
            <p className="text-sm text-white/80 mb-2">{selectedImage.shortNote}</p>
            <div className="flex flex-wrap gap-1">
              {selectedImage.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-1 bg-white/20 rounded-md text-xs">
                  {tag}
                </span>
              ))}
              {selectedImage.tags.length > 3 && (
                <span className="px-2 py-1 bg-white/20 rounded-md text-xs">+{selectedImage.tags.length - 3} more</span>
              )}
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
