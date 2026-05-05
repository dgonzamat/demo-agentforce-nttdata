"use client"

import { useState, useRef } from "react"

export function useIdentityVerification() {
  const [identityVerified, setIdentityVerified] = useState(false)
  const [currentIdentityStep, setCurrentIdentityStep] = useState(1)
  const [faceScanComplete, setFaceScanComplete] = useState(false)
  const [fingerprintScanComplete, setFingerprintScanComplete] = useState(false)
  const [faceDetected, setFaceDetected] = useState(false)
  const [scanProgress, setScanProgress] = useState(0)
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Función para iniciar el escaneo facial
  const startFaceScan = () => {
    setFaceDetected(true)

    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current)
    }

    scanTimerRef.current = setInterval(() => {
      setScanProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          if (scanTimerRef.current) {
            clearInterval(scanTimerRef.current)
            scanTimerRef.current = null
          }
          setFaceScanComplete(true)
          return 100
        }
        return newProgress
      })
    }, 200)
  }

  // Función para iniciar el escaneo de huella digital
  const startFingerprintScan = () => {
    setFingerprintScanComplete(true)
  }

  // Función para completar la verificación de identidad
  const completeIdentity = () => {
    setIdentityVerified(true)
  }

  // Función para reiniciar la verificación
  const resetIdentity = () => {
    setIdentityVerified(false)
    setCurrentIdentityStep(1)
    setFaceScanComplete(false)
    setFingerprintScanComplete(false)
    setFaceDetected(false)
    setScanProgress(0)

    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current)
      scanTimerRef.current = null
    }
  }

  return {
    identityVerified,
    currentIdentityStep,
    faceScanComplete,
    fingerprintScanComplete,
    faceDetected,
    scanProgress,
    startFaceScan,
    startFingerprintScan,
    completeIdentity,
    resetIdentity,
  }
}
