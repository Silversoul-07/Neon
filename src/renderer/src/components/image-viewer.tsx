"use client"

import { X, Heart, Share, Download, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { useAppStore } from "@/lib/store"

export function ImageViewer() {
  const { selectedImage, setSelectedImage, images, metadataSidebarCollapsed, setMetadataSidebarCollapsed } =
    useAppStore()

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

  return (
    <div className="flex-1 flex bg-black relative">
      {/* Main Image Area */}
      <div className="flex-1 flex items-center justify-center relative">
        <img
          src={selectedImage.src || "/placeholder.svg"}
          alt={selectedImage.title}
          className="max-w-full max-h-full object-contain"
        />

        {/* Navigation Arrows */}
        {canGoPrev && (
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {canGoNext && (
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedImage(null)}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors">
              <Share className="w-5 h-5" />
            </button>
            <button className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors">
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMetadataSidebarCollapsed(!metadataSidebarCollapsed)}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Metadata Sidebar */}
      {!metadataSidebarCollapsed && (
        <div className="w-80 bg-background border-l border-border p-4 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">{selectedImage.title}</h3>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">File Size</label>
                <p className="text-sm">{selectedImage.size}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Type</label>
                <p className="text-sm">{selectedImage.type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Dimensions</label>
                <p className="text-sm">{selectedImage.dimensions}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Date Created</label>
                <p className="text-sm">{selectedImage.dateCreated}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Tags</label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedImage.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-muted rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
