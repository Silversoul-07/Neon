"use client"

import { Menu, Heart, Users, Tag, Trash2 } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAppStore } from "@/lib/store"

const mainItems = [
  { icon: Menu, label: "All", count: 1234 },
  { icon: Heart, label: "Favourites", count: 23 },
  { icon: Users, label: "People", count: 45 },
  { icon: Tag, label: "Untagged", count: 12 },
  { icon: Trash2, label: "Trash", count: 3 },
]

export function MainNavigation() {
  const { sidebarCollapsed } = useAppStore()

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {mainItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton className="w-full" tooltip={sidebarCollapsed ? item.label : undefined}>
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && (
                  <>
                    <span>{item.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {item.count}
                    </span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
