"use client"

import type React from "react"

import { Heart, Share, Download, Edit, Trash2 } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useContextMenu } from "./context-menu"

interface ImageCardProps {
  id: number
  src: string
  title: string
}

export function ImageCard({ id, src, title }: ImageCardProps) {
  const { images, setSelectedImage } = useAppStore()
  const { showContextMenu } = useContextMenu()

  const image = images.find((img) => img.id === id)

  const handleImageClick = () => {
    if (image) {
      setSelectedImage(image)
    }
  }

  const handleContextMenu = (event: React.MouseEvent) => {
    showContextMenu(event, [
      { label: "Add to Favourites", icon: Heart, onClick: () => console.log("Add to favourites", title) },
      { label: "Share", icon: Share, onClick: () => console.log("Share", title) },
      { label: "Download", icon: Download, onClick: () => console.log("Download", title) },
      { separator: true },
      { label: "Rename", icon: Edit, onClick: () => console.log("Rename", title) },
      { label: "Delete", icon: Trash2, onClick: () => console.log("Delete", title) },
    ])
  }

  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-border"
      onClick={handleImageClick}
      onContextMenu={handleContextMenu}
    >
      <div className="aspect-square bg-muted">
        <img
          src={src || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          className="p-1 bg-background rounded-full shadow-lg hover:bg-accent border border-border"
          onClick={(e) => {
            e.stopPropagation()
            console.log("Toggle favourite", title)
          }}
        >
          <Heart className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
