"use client"

import { useState } from "react"
import { Heart, Camera, Music, FileText, ImageIcon, Video } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SearchBar } from "./search-bar"

const smartTags = [
  { icon: Heart, label: "Love", color: "text-red-500", count: 15 },
  { icon: Camera, label: "Photography", color: "text-blue-500", count: 89 },
  { icon: Music, label: "Music", color: "text-purple-500", count: 34 },
  { icon: FileText, label: "Documents", color: "text-green-500", count: 67 },
  { icon: ImageIcon, label: "Design", color: "text-yellow-500", count: 45 },
  { icon: Video, label: "Videos", color: "text-indigo-500", count: 23 },
]

export function SmartTagsSection() {
  const [tagSearchQuery, setTagSearchQuery] = useState("")

  const filteredTags = smartTags.filter((tag) => tag.label.toLowerCase().includes(tagSearchQuery.toLowerCase()))

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Smart Tags</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="mb-3 px-3">
          <SearchBar placeholder="Search tags..." value={tagSearchQuery} onChange={setTagSearchQuery} />
        </div>
        <SidebarMenu>
          {filteredTags.map((tag) => (
            <SidebarMenuItem key={tag.label}>
              <SidebarMenuButton className="w-full">
                <tag.icon className={`w-5 h-5 ${tag.color}`} />
                <span>{tag.label}</span>
                <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                  {tag.count}
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
