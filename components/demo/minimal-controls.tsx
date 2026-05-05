"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpeedControl } from "./speed-control"

interface MinimalControlsProps {
  playing: boolean
  togglePlay: () => void
  toggleFullscreen: () => void
  visible: boolean
  playbackSpeed?: number
  onSpeedChange?: (speed: number) => void
}

export function MinimalControls({
  playing,
  togglePlay,
  toggleFullscreen,
  visible,
  playbackSpeed = 1,
  onSpeedChange,
}: MinimalControlsProps) {
  const [isVisible, setIsVisible] = useState(visible)

  // Efecto para manejar la visibilidad con delay
  useEffect(() => {
    if (visible) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false)
      }, 300) // Delay para la animación
      return () => clearTimeout(timer)
    }
  }, [visible])

  if (!isVisible) return null

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-full p-2 flex items-center space-x-4 transition-opacity duration-300 z-50 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={togglePlay}
        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-12 h-12 p-0 flex items-center justify-center"
      >
        {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
      </Button>

      {onSpeedChange && (
        <div className="px-2">
          <SpeedControl
            currentSpeed={playbackSpeed || 1}
            onSpeedChange={(speed) => {
              console.log("MinimalControls: Cambiando velocidad a:", speed)
              if (onSpeedChange) onSpeedChange(speed)
            }}
            className="bg-transparent text-white border-white border-opacity-50 hover:bg-white hover:bg-opacity-20 text-base font-medium"
          />
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={toggleFullscreen}
        className="text-white hover:bg-white hover:bg-opacity-20 rounded-full w-12 h-12 p-0 flex items-center justify-center"
      >
        <Minimize className="h-6 w-6" />
      </Button>
    </div>
  )
}
