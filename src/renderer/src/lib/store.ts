"use client"

import { create } from "zustand"

interface Image {
  id: number
  src: string
  title: string
  shortNote: string
  source: string
  size: string
  type: string
  dateCreated: string
  dateModified: string
  dimensions: string
  resolution: string
  colorSpace: string
  tags: string[]
  thumbnail: string
}

interface AppState {
  // UI State
  darkMode: boolean
  sidebarCollapsed: boolean
  metadataSidebarCollapsed: boolean
  sidebarWidth: number
  showTaggingDialog: boolean

  // Search & Filter
  searchQuery: string
  tagSearchQuery: string

  // Images
  images: Image[]
  selectedImage: Image | null
  availableTags: string[]

  // Actions
  setDarkMode: (darkMode: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setMetadataSidebarCollapsed: (collapsed: boolean) => void
  setSidebarWidth: (width: number) => void
  setSearchQuery: (query: string) => void
  setTagSearchQuery: (query: string) => void
  setSelectedImage: (image: Image | null) => void
  setShowTaggingDialog: (show: boolean) => void
  toggleTheme: () => void
  updateImageMetadata: (id: number, updates: Partial<Image>) => void
  addTagToImage: (imageId: number, tag: string) => void
  removeTagFromImage: (imageId: number, tag: string) => void
  addAvailableTag: (tag: string) => void
  getRandomRecommendations: (currentImageId: number, count?: number) => Image[]
}

const generateMockImages = (): Image[] => {
  const mockTags = [
    "nature",
    "landscape",
    "portrait",
    "urban",
    "abstract",
    "wildlife",
    "architecture",
    "street",
    "macro",
    "sunset",
  ]

  return Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/800/600?random=${i + 1}`,
    thumbnail: `https://picsum.photos/200/150?random=${i + 1}`,
    title: `Image ${i + 1}`,
    shortNote: `Beautiful capture from my collection #${i + 1}`,
    source: `Camera ${Math.floor(Math.random() * 3) + 1}`,
    size: `${Math.floor(Math.random() * 5000 + 1000)} KB`,
    type: ["JPEG", "PNG", "RAW"][Math.floor(Math.random() * 3)],
    dateCreated: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    dateModified: new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString(),
    dimensions: `${800 + Math.floor(Math.random() * 400)}x${600 + Math.floor(Math.random() * 300)}`,
    resolution: `${72 + Math.floor(Math.random() * 228)} DPI`,
    colorSpace: ["sRGB", "Adobe RGB", "ProPhoto RGB"][Math.floor(Math.random() * 3)],
    tags: mockTags.slice(0, Math.floor(Math.random() * 4) + 1),
  }))
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  darkMode: false,
  sidebarCollapsed: true,
  metadataSidebarCollapsed: true,
  sidebarWidth: 280,
  showTaggingDialog: false,
  searchQuery: "",
  tagSearchQuery: "",
  images: generateMockImages(),
  selectedImage: null,
  availableTags: [
    "nature",
    "landscape",
    "portrait",
    "urban",
    "abstract",
    "wildlife",
    "architecture",
    "street",
    "macro",
    "sunset",
    "photography",
    "art",
    "travel",
    "people",
    "animals",
  ],

  // Actions
  setDarkMode: (darkMode) => set({ darkMode }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  setMetadataSidebarCollapsed: (metadataSidebarCollapsed) => set({ metadataSidebarCollapsed }),
  setSidebarWidth: (sidebarWidth) => set({ sidebarWidth }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setTagSearchQuery: (tagSearchQuery) => set({ tagSearchQuery }),
  setSelectedImage: (selectedImage) => set({ selectedImage }),
  setShowTaggingDialog: (showTaggingDialog) => set({ showTaggingDialog }),
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),

  updateImageMetadata: (id, updates) =>
    set((state) => ({
      images: state.images.map((img) => (img.id === id ? { ...img, ...updates } : img)),
      selectedImage: state.selectedImage?.id === id ? { ...state.selectedImage, ...updates } : state.selectedImage,
    })),

  addTagToImage: (imageId, tag) =>
    set((state) => {
      const updatedImages = state.images.map((img) =>
        img.id === imageId ? { ...img, tags: [...new Set([...img.tags, tag])] } : img,
      )
      return {
        images: updatedImages,
        selectedImage:
          state.selectedImage?.id === imageId
            ? { ...state.selectedImage, tags: [...new Set([...state.selectedImage.tags, tag])] }
            : state.selectedImage,
        availableTags: [...new Set([...state.availableTags, tag])],
      }
    }),

  removeTagFromImage: (imageId, tag) =>
    set((state) => {
      const updatedImages = state.images.map((img) =>
        img.id === imageId ? { ...img, tags: img.tags.filter((t) => t !== tag) } : img,
      )
      return {
        images: updatedImages,
        selectedImage:
          state.selectedImage?.id === imageId
            ? { ...state.selectedImage, tags: state.selectedImage.tags.filter((t) => t !== tag) }
            : state.selectedImage,
      }
    }),

  addAvailableTag: (tag) =>
    set((state) => ({
      availableTags: [...new Set([...state.availableTags, tag])],
    })),

  getRandomRecommendations: (currentImageId, count = 6) => {
    const state = get()
    const otherImages = state.images.filter((img) => img.id !== currentImageId)
    const shuffled = [...otherImages].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  },
}))
