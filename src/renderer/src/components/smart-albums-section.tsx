"use client"

import type React from "react"

import { Heart, Camera, Music, FileText, ImageIcon, Video, Edit, Trash2, Plus } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SearchBar } from "./search-bar"
import { useAppStore } from "@/lib/store"
import { useContextMenu } from "./context-menu"

const smartAlbums = [
  { icon: Heart, label: "Love", color: "text-pink-500", count: 15 },
  { icon: Camera, label: "Photography", color: "text-emerald-500", count: 89 },
  { icon: Music, label: "Music", color: "text-violet-500", count: 34 },
  { icon: FileText, label: "Documents", color: "text-amber-500", count: 67 },
  { icon: ImageIcon, label: "Design", color: "text-cyan-500", count: 45 },
  { icon: Video, label: "Videos", color: "text-rose-500", count: 23 },
]

export function SmartAlbumsSection() {
  const { tagSearchQuery, setTagSearchQuery, sidebarCollapsed } = useAppStore()
  const { showContextMenu } = useContextMenu()

  const filteredAlbums = smartAlbums.filter((album) => album.label.toLowerCase().includes(tagSearchQuery.toLowerCase()))

  const handleAlbumContextMenu = (event: React.MouseEvent, album: (typeof smartAlbums)[0]) => {
    showContextMenu(event, [
      { label: "Rename Album", icon: Edit, onClick: () => console.log("Rename", album.label) },
      { label: "Add Images", icon: Plus, onClick: () => console.log("Add images to", album.label) },
      { separator: true },
      { label: "Delete Album", icon: Trash2, onClick: () => console.log("Delete", album.label) },
    ])
  }

  if (sidebarCollapsed) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Smart Albums</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="mb-3 px-3">
          <SearchBar placeholder="Search albums..." value={tagSearchQuery} onChange={setTagSearchQuery} />
        </div>
        <SidebarMenu>
          {filteredAlbums.map((album) => (
            <SidebarMenuItem key={album.label}>
              <SidebarMenuButton className="w-full" onContextMenu={(e) => handleAlbumContextMenu(e, album)}>
                <album.icon className={`w-5 h-5 ${album.color}`} />
                <span>{album.label}</span>
                <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {album.count}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
