"use client"

import { Plus, Sun, Moon, Filter, Grid3X3, User } from "lucide-react"

interface ActionButtonsProps {
  darkMode: boolean
  onToggleTheme: () => void
}

export function ActionButtons({ darkMode, onToggleTheme }: ActionButtonsProps) {
  return (
    <div className="flex items-center space-x-2">
      {/* Create Tag Button */}
      <button onClick={() => {}} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Create Tag">
        <Plus className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Theme Toggle */}
      <button
        onClick={onToggleTheme}
        className="p-2 rounded-lg hover:bg-accent transition-colors"
        title={darkMode ? "Light Mode" : "Dark Mode"}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Moon className="w-5 h-5 text-muted-foreground" />
        )}
      </button>

      {/* Filter Button */}
      <button onClick={() => {}} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Filter">
        <Filter className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Layout Button */}
      <button onClick={() => {}} className="p-2 rounded-lg hover:bg-accent transition-colors" title="Layout">
        <Grid3X3 className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Avatar */}
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow">
        <User className="w-4 h-4 text-white" />
      </div>
    </div>
  )
}
