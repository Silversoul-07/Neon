"use client"

import type React from "react"

import { createContext, useContext, useState, useRef, useEffect, type ReactNode } from "react"

interface ContextMenuProps {
  children: ReactNode
  items: Array<{
    label: string
    icon?: React.ComponentType<{ className?: string }>
    onClick: () => void
    separator?: boolean
  }>
}

interface ContextMenuContextType {
  showContextMenu: (event: React.MouseEvent, items: ContextMenuProps["items"]) => void
}

const ContextMenuContext = createContext<ContextMenuContextType | null>(null)

export function ContextMenuProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [menuItems, setMenuItems] = useState<ContextMenuProps["items"]>([])
  const menuRef = useRef<HTMLDivElement>(null)

  const showContextMenu = (event: React.MouseEvent, items: ContextMenuProps["items"]) => {
    event.preventDefault()
    setMenuItems(items)
    setPosition({ x: event.clientX, y: event.clientY })
    setIsVisible(true)
  }

  useEffect(() => {
    const handleClickOutside = () => setIsVisible(false)
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsVisible(false)
    }

    if (isVisible) {
      document.addEventListener("click", handleClickOutside)
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isVisible])

  return (
    <ContextMenuContext.Provider value={{ showContextMenu }}>
      {children}
      {isVisible && (
        <div
          ref={menuRef}
          className="fixed z-50 bg-popover border border-border rounded-md shadow-lg py-1 min-w-[160px]"
          style={{ left: position.x, top: position.y }}
        >
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.separator && <div className="h-px bg-border my-1" />}
              <button
                className="w-full px-3 py-2 text-left text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2"
                onClick={() => {
                  item.onClick()
                  setIsVisible(false)
                }}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </ContextMenuContext.Provider>
  )
}

export function useContextMenu() {
  const context = useContext(ContextMenuContext)
  if (!context) {
    throw new Error("useContextMenu must be used within ContextMenuProvider")
  }
  return context
}
