"use client"

import { useAppStore } from "@/lib/store"
import { WaterfallLayout } from "./waterfall-layout"

export function RecommendationsSection() {
  const { selectedImage, setSelectedImage, getRandomRecommendations, layoutType } = useAppStore()

  if (!selectedImage) return null

  const recommendations = getRandomRecommendations(selectedImage.id, 8)

  return (
    <div className="absolute bottom-4 left-4 right-4 max-h-48">
      <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
        <h3 className="text-foreground text-sm font-medium mb-4">You might also like</h3>

        {layoutType === "waterfall" ? (
          <div className="h-32 overflow-hidden">
            <WaterfallLayout images={recommendations} columns={6} />
          </div>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recommendations.map((image) => (
              <button key={image.id} onClick={() => setSelectedImage(image)} className="flex-shrink-0 group">
                <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden border border-border group-hover:border-accent-foreground/20 transition-all">
                  <img
                    src={image.thumbnail || "/placeholder.svg"}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2 truncate w-20 text-center">{image.title}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
