"use client"

import type React from "react"

import { Heart, Share, Download, Edit, Trash2 } from "lucide-react"
import { useAppStore } from "@/lib/store"
import { useContextMenu } from "./context-menu"

interface ImageCardProps {
  id: number
  src: string
  title: string
  className?: string
}

export function ImageCard({ id, src, title, className = "" }: ImageCardProps) {
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
      className={`group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-border hover:border-accent-foreground/20 ${className}`}
      onClick={handleImageClick}
      onContextMenu={handleContextMenu}
    >
      <div className="w-full h-full bg-muted">
        <img
          src={src || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-opacity duration-300" />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="p-1 bg-background rounded-full shadow-lg hover:bg-accent border border-border transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            console.log("Toggle favourite", title)
          }}
        >
          <Heart className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-background/90 backdrop-blur-sm rounded-md p-2 border border-border">
          <p className="text-foreground text-sm font-medium truncate">{title}</p>
        </div>
      </div>
    </div>
  )
}
