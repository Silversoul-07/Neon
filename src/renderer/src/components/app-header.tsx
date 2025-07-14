"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { SearchBar } from "./search-bar"
import { ActionButtons } from "./action-buttons"

interface AppHeaderProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  darkMode: boolean
  onToggleTheme: () => void
}

export function AppHeader({ searchQuery, onSearchChange, darkMode, onToggleTheme }: AppHeaderProps) {
  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Left side - Sidebar Toggle */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="p-2 rounded-lg hover:bg-accent transition-colors" />
        </div>

        {/* Center - Search Bar */}
        <div className="flex-1 max-w-md mx-auto">
          <SearchBar placeholder="Search images..." value={searchQuery} onChange={onSearchChange} />
        </div>

        {/* Right side - Action buttons */}
        <ActionButtons darkMode={darkMode} onToggleTheme={onToggleTheme} />
      </div>
    </div>
  )
}
