"use client"

import { useState } from "react"
import { X, Plus, TagIcon, Search } from "lucide-react"
import { useAppStore } from "@/lib/store"

export function TaggingDialog() {
  const {
    showTaggingDialog,
    setShowTaggingDialog,
    selectedImage,
    availableTags,
    addTagToImage,
    removeTagFromImage,
    addAvailableTag,
  } = useAppStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [newTag, setNewTag] = useState("")

  if (!showTaggingDialog || !selectedImage) return null

  const filteredTags = availableTags.filter(
    (tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedImage.tags.includes(tag),
  )

  const handleAddTag = (tag: string) => {
    addTagToImage(selectedImage.id, tag)
  }

  const handleRemoveTag = (tag: string) => {
    removeTagFromImage(selectedImage.id, tag)
  }

  const handleCreateNewTag = () => {
    if (newTag.trim() && !availableTags.includes(newTag.trim())) {
      addAvailableTag(newTag.trim())
      addTagToImage(selectedImage.id, newTag.trim())
      setNewTag("")
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowTaggingDialog(false)} />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl glass-strong dark:glass-strong-dark rounded-2xl p-6 text-foreground">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <TagIcon className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Manage Tags</h2>
          </div>
          <button
            onClick={() => setShowTaggingDialog(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image Preview */}
        <div className="flex items-start gap-4 mb-6">
          <img
            src={selectedImage.thumbnail || "/placeholder.svg"}
            alt={selectedImage.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-medium">{selectedImage.title}</h3>
            <p className="text-sm text-muted-foreground">{selectedImage.shortNote}</p>
          </div>
        </div>

        {/* Current Tags */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Current Tags</h3>
          <div className="flex flex-wrap gap-2">
            {selectedImage.tags.length > 0 ? (
              selectedImage.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-primary/30 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No tags added yet</p>
            )}
          </div>
        </div>

        {/* Add New Tag */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Add New Tag</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Enter new tag..."
              className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              onKeyPress={(e) => e.key === "Enter" && handleCreateNewTag()}
            />
            <button
              onClick={handleCreateNewTag}
              disabled={!newTag.trim()}
              className="px-4 py-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Search Existing Tags */}
        <div>
          <h3 className="text-sm font-medium mb-3">Available Tags</h3>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tags..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="max-h-40 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleAddTag(tag)}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
            {filteredTags.length === 0 && searchQuery && (
              <p className="text-muted-foreground text-sm text-center py-4">No matching tags found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
