"use client"

import { Star } from "lucide-react"

interface ImageCardProps {
  id: number
  src: string
  title: string
}

export function ImageCard({ id, src, title }: ImageCardProps) {
  return (
    <div className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-border">
      <div className="aspect-square bg-muted">
        <img
          src={src || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity" />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1 bg-background rounded-full shadow-lg hover:bg-accent border border-border">
          <Star className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
