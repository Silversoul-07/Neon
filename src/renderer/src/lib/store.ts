"use client"

import { create } from "zustand"

interface Image {
  id: number
  src: string
  title: string
  size: string
  type: string
  dateCreated: string
  dimensions: string
  tags: string[]
}

interface AppState {
  // UI State
  darkMode: boolean
  sidebarCollapsed: boolean
  metadataSidebarCollapsed: boolean
  sidebarWidth: number

  // Search & Filter
  searchQuery: string
  tagSearchQuery: string

  // Images
  images: Image[]
  selectedImage: Image | null

  // Actions
  setDarkMode: (darkMode: boolean) => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setMetadataSidebarCollapsed: (collapsed: boolean) => void
  setSidebarWidth: (width: number) => void
  setSearchQuery: (query: string) => void
  setTagSearchQuery: (query: string) => void
  setSelectedImage: (image: Image | null) => void
  toggleTheme: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  darkMode: false,
  sidebarCollapsed: true, // Default collapsed
  metadataSidebarCollapsed: true,
  sidebarWidth: 280,
  searchQuery: "",
  tagSearchQuery: "",
  images: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    src: `https://picsum.photos/300/200?random=${i + 1}`,
    title: `Image ${i + 1}`,
    size: `${Math.floor(Math.random() * 5000 + 1000)} KB`,
    type: "JPEG",
    dateCreated: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
    dimensions: `${300 + Math.floor(Math.random() * 200)}x${200 + Math.floor(Math.random() * 150)}`,
    tags: ["photography", "nature", "landscape"].slice(0, Math.floor(Math.random() * 3) + 1),
  })),
  selectedImage: null,

  // Actions
  setDarkMode: (darkMode) => set({ darkMode }),
  setSidebarCollapsed: (sidebarCollapsed) => set({ sidebarCollapsed }),
  setMetadataSidebarCollapsed: (metadataSidebarCollapsed) => set({ metadataSidebarCollapsed }),
  setSidebarWidth: (sidebarWidth) => set({ sidebarWidth }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setTagSearchQuery: (tagSearchQuery) => set({ tagSearchQuery }),
  setSelectedImage: (selectedImage) => set({ selectedImage }),
  toggleTheme: () => set((state) => ({ darkMode: !state.darkMode })),
}))
