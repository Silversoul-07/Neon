"use client"

import { useEffect, useRef, useState } from "react"
import { ImageCard } from "./image-card"

interface Image {
  id: number
  src: string
  title: string
  aspectRatio: number
}

interface WaterfallLayoutProps {
  images: Image[]
  columns?: number
}

export function WaterfallLayout({ images, columns = 4 }: WaterfallLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [columnHeights, setColumnHeights] = useState<number[]>(Array(columns).fill(0))
  const [imagePositions, setImagePositions] = useState<
    Array<{ left: number; top: number; width: number; height: number }>
  >([])

  useEffect(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const gap = 16 // 1rem gap
    const columnWidth = (containerWidth - gap * (columns - 1)) / columns

    const heights = Array(columns).fill(0)
    const positions: Array<{ left: number; top: number; width: number; height: number }> = []

    images.forEach((image) => {
      // Find the shortest column
      const shortestColumnIndex = heights.indexOf(Math.min(...heights))

      // Calculate image height based on aspect ratio
      const imageHeight = columnWidth / image.aspectRatio

      // Calculate position
      const left = shortestColumnIndex * (columnWidth + gap)
      const top = heights[shortestColumnIndex]

      positions.push({
        left,
        top,
        width: columnWidth,
        height: imageHeight,
      })

      // Update column height
      heights[shortestColumnIndex] += imageHeight + gap
    })

    setColumnHeights(heights)
    setImagePositions(positions)
  }, [images, columns])

  const containerHeight = Math.max(...columnHeights)

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: `${containerHeight}px` }}>
      {images.map((image, index) => {
        const position = imagePositions[index]
        if (!position) return null

        return (
          <div
            key={image.id}
            className="absolute transition-all duration-300"
            style={{
              left: `${position.left}px`,
              top: `${position.top}px`,
              width: `${position.width}px`,
              height: `${position.height}px`,
            }}
          >
            <ImageCard
              id={image.id}
              src={image.src || "/placeholder.svg"}
              title={image.title}
              className="w-full h-full"
            />
          </div>
        )
      })}
    </div>
  )
}
