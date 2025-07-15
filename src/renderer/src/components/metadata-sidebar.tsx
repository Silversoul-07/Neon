"use client"

import type React from "react"

import { useState } from "react"
import { Edit2, Save, X, Tag, Calendar, ImageIcon, Palette } from "lucide-react"
import { useAppStore } from "@/lib/store"

export function MetadataSidebar() {
  const { selectedImage, updateImageMetadata, setShowTaggingDialog } = useAppStore()
  const [editingField, setEditingField] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<Record<string, string>>({})

  if (!selectedImage) return null

  const handleEdit = (field: string, currentValue: string) => {
    setEditingField(field)
    setEditValues({ ...editValues, [field]: currentValue })
  }

  const handleSave = (field: string) => {
    if (editValues[field] !== undefined) {
      updateImageMetadata(selectedImage.id, { [field]: editValues[field] })
    }
    setEditingField(null)
  }

  const handleCancel = () => {
    setEditingField(null)
    setEditValues({})
  }

  const EditableField = ({
    field,
    label,
    value,
    icon: Icon,
  }: {
    field: string
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
  }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <label className="text-sm font-medium text-muted-foreground">{label}</label>
        </div>
        {editingField !== field && (
          <button onClick={() => handleEdit(field, value)} className="p-1 hover:bg-white/10 rounded transition-colors">
            <Edit2 className="w-3 h-3" />
          </button>
        )}
      </div>

      {editingField === field ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={editValues[field] || ""}
            onChange={(e) => setEditValues({ ...editValues, [field]: e.target.value })}
            className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
            autoFocus
          />
          <button
            onClick={() => handleSave(field)}
            className="p-1 hover:bg-green-500/20 text-green-400 rounded transition-colors"
          >
            <Save className="w-3 h-3" />
          </button>
          <button onClick={handleCancel} className="p-1 hover:bg-red-500/20 text-red-400 rounded transition-colors">
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <p className="text-sm">{value}</p>
      )}
    </div>
  )

  return (
    <div className="w-80 glass-subtle dark:glass-subtle-dark border-l border-white/10 p-4 overflow-y-auto text-white">
      <div className="space-y-6">
        {/* Thumbnail */}
        <div className="text-center">
          <img
            src={selectedImage.thumbnail || "/placeholder.svg"}
            alt={selectedImage.title}
            className="w-32 h-32 object-cover rounded-lg mx-auto mb-2"
          />
        </div>

        {/* Editable Fields */}
        <EditableField field="title" label="Title" value={selectedImage.title} icon={ImageIcon} />

        <EditableField field="shortNote" label="Short Note" value={selectedImage.shortNote} icon={Edit2} />

        <EditableField field="source" label="Source" value={selectedImage.source} icon={Calendar} />

        {/* Tags Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <label className="text-sm font-medium text-muted-foreground">Tags</label>
            </div>
            <button
              onClick={() => setShowTaggingDialog(true)}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {selectedImage.tags.length > 0 ? (
              selectedImage.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 bg-primary/20 text-primary rounded-md text-xs">
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No tags</p>
            )}
          </div>
        </div>

        {/* Properties Section */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Properties
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <label className="text-muted-foreground">File Size</label>
              <p>{selectedImage.size}</p>
            </div>

            <div>
              <label className="text-muted-foreground">Type</label>
              <p>{selectedImage.type}</p>
            </div>

            <div>
              <label className="text-muted-foreground">Dimensions</label>
              <p>{selectedImage.dimensions}</p>
            </div>

            <div>
              <label className="text-muted-foreground">Resolution</label>
              <p>{selectedImage.resolution}</p>
            </div>

            <div>
              <label className="text-muted-foreground">Color Space</label>
              <p>{selectedImage.colorSpace}</p>
            </div>

            <div>
              <label className="text-muted-foreground">Date Created</label>
              <p>{selectedImage.dateCreated}</p>
            </div>

            <div>
              <label className="text-muted-foreground">Date Modified</label>
              <p>{selectedImage.dateModified}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
