"use client"

import { useState } from "react"

export function useDigitalSignature() {
  const [signatureComplete, setSignatureComplete] = useState(false)

  // Función para completar la firma
  const completeSignature = () => {
    setSignatureComplete(true)
  }

  // Función para reiniciar la firma
  const resetSignature = () => {
    setSignatureComplete(false)
  }

  return {
    signatureComplete,
    completeSignature,
    resetSignature,
  }
}
