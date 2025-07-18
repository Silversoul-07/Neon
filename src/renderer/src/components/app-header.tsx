"use client"

import { SearchBar } from "./search-bar"
import { ActionButtons } from "./action-buttons"
import { useAppStore } from "@/lib/store"

export function AppHeader() {
  const { searchQuery, setSearchQuery } = useAppStore()

  return (
    <div className="bg-background border-b border-border px-6 py-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex-1 max-w-md">
          <SearchBar placeholder="Search images..." value={searchQuery} onChange={setSearchQuery} />
        </div>
        <ActionButtons />
      </div>
    </div>
  )
}
