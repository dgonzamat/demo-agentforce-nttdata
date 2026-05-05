"use client"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

interface SpeedControlProps {
  currentSpeed: number
  onSpeedChange: (speed: number) => void
  className?: string
}

export function SpeedControl({ currentSpeed, onSpeedChange, className = "" }: SpeedControlProps) {
  const speeds = [1, 1.5, 2, 2.5]
  const [isOpen, setIsOpen] = useState(false)
  const [localSpeed, setLocalSpeed] = useState(currentSpeed)

  // Sincronizar el estado local con las props
  useEffect(() => {
    setLocalSpeed(currentSpeed)
  }, [currentSpeed])

  const handleSpeedChange = (speed: number) => {
    console.log("SpeedControl: Cambiando velocidad a:", speed)
    setLocalSpeed(speed)
    onSpeedChange(speed)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-1 font-medium ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{localSpeed}x</span>
        <span className="ml-1 text-xs">{isOpen ? "▲" : "▼"}</span>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white rounded-md shadow-lg z-50 w-[120px] py-1">
          {speeds.map((speed) => (
            <button
              key={speed}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
              onClick={() => handleSpeedChange(speed)}
            >
              <span>{speed}x</span>
              {localSpeed === speed && <span>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
