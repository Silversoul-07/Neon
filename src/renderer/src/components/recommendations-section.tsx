"use client"

import { useAppStore } from "@/lib/store"

export function RecommendationsSection() {
  const { selectedImage, setSelectedImage, getRandomRecommendations } = useAppStore()

  if (!selectedImage) return null

  const recommendations = getRandomRecommendations(selectedImage.id)

  return (
    <div className="absolute bottom-4 left-4 right-4">
      <div className="glass-strong dark:glass-strong-dark rounded-xl p-4">
        <h3 className="text-white text-sm font-medium mb-3">You might also like</h3>
        <div className="flex gap-3 overflow-x-auto">
          {recommendations.map((image) => (
            <button key={image.id} onClick={() => setSelectedImage(image)} className="flex-shrink-0 group">
              <img
                src={image.thumbnail || "/placeholder.svg"}
                alt={image.title}
                className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
              <p className="text-xs text-white/80 mt-1 truncate w-16">{image.title}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
