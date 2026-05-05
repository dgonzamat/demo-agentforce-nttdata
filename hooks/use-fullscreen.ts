"use client"

import { useState, useRef, useEffect } from "react"

export function useFullscreen() {
  const [fullscreen, setFullscreen] = useState(false)
  const [showMinimalControls, setShowMinimalControls] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const toggleFullscreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      // Entrar en pantalla completa
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen()
      } else if (containerRef.current?.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen()
      } else if (containerRef.current?.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen()
      } else if (containerRef.current?.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen()
      }
      setFullscreen(true)
      setShowMinimalControls(true)
    } else {
      // Salir de pantalla completa
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
      setFullscreen(false)
      setShowMinimalControls(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenNow = !!(
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      )

      setFullscreen(isFullscreenNow)
      setShowMinimalControls(isFullscreenNow)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("mozfullscreenchange", handleFullscreenChange)
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange)
    document.addEventListener("MSFullscreenChange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange)
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange)
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange)
    }
  }, [])

  return {
    fullscreen,
    showMinimalControls,
    containerRef,
    toggleFullscreen,
  }
}
