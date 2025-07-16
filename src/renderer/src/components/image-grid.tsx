"use client"

import { ImageCard } from "./image-card"
import { WaterfallLayout } from "./waterfall-layout"
import { useAppStore } from "@/lib/store"

export function ImageGrid() {
  const { images, searchQuery, layoutType } = useAppStore()

  const filteredImages = images.filter((img) => img.title.toLowerCase().includes(searchQuery.toLowerCase()))

  if (layoutType === "waterfall") {
    return (
      <div className="flex-1 overflow-y-auto p-6 bg-background">
        <WaterfallLayout images={filteredImages} columns={4} />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="aspect-square">
            <ImageCard
              id={image.id}
              src={image.src || "/placeholder.svg"}
              title={image.title}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
