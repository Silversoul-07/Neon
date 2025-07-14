"use client"

import { ImageCard } from "./image-card"

interface Image {
  id: number
  src: string
  title: string
}

interface ImageGridProps {
  images: Image[]
  searchQuery: string
}

export function ImageGrid({ images, searchQuery }: ImageGridProps) {
  const filteredImages = images.filter((img) => img.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredImages.map((image) => (
          <ImageCard key={image.id} id={image.id} src={image.src || "/placeholder.svg"} title={image.title} />
        ))}
      </div>
    </div>
  )
}
