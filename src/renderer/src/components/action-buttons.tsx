"use client"

import { Plus, Sun, Moon, Filter, Grid3X3, User } from "lucide-react"
import { useAppStore } from "@/lib/store"

export function ActionButtons() {
  const { darkMode, toggleTheme } = useAppStore()

  return (
    <div className="flex items-center space-x-2">
      <button onClick={() => {}} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Create Album">
        <Plus className="w-5 h-5 text-muted-foreground" />
      </button>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title={darkMode ? "Light Mode" : "Dark Mode"}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Moon className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      <button onClick={() => {}} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Filter">
        <Filter className="w-5 h-5 text-muted-foreground" />
      </button>

      <button onClick={() => {}} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Layout">
        <Grid3X3 className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
        <User className="w-4 h-4 text-white" />
      </div>
    </div>
  )
}
