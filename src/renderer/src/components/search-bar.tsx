"use client"

import { Search } from "lucide-react"

interface SearchBarProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SearchBar({ placeholder, value, onChange, className = "" }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent bg-background"
      />
    </div>
  )
}
