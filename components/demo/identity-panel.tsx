"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Check, Shield, User, Scan, CheckSquare } from "lucide-react"

interface IdentityPanelProps {
  faceScanComplete: boolean
  scanProgress: number
  faceDetected: boolean
  startFaceScan: () => void
  completeIdentity: () => void
}

export function IdentityPanel({
  faceScanComplete,
  scanProgress,
  faceDetected,
  startFaceScan,
  completeIdentity,
}: IdentityPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-blue-600 mb-2 max-w-[90%]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-600" />
          Verificación de Identidad
        </h3>
        <div className="text-sm text-blue-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          Reconocimiento Facial
        </div>
      </div>

      <div className="mb-3">
        <Progress value={faceScanComplete ? 100 : scanProgress} className="h-2" />
      </div>

      {!faceScanComplete ? (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-blue-800">Verificación Biométrica</h4>
            <Button onClick={startFaceScan} size="sm" className="bg-blue-600 hover:bg-blue-700" disabled={faceDetected}>
              {faceDetected ? "Escaneando..." : "Iniciar verificación"}
            </Button>
          </div>

          <div className="border rounded-lg p-4 bg-blue-50">
            {faceDetected ? (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 relative mb-3">
                  <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-pulse"></div>
                  <div className="absolute inset-2 border-2 border-blue-300 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Scan className="h-16 w-16 text-blue-600 animate-pulse" />
                  </div>
                </div>
                <p className="text-center text-sm font-medium text-blue-800 mb-1">Escaneando rasgos faciales...</p>
                <div className="flex items-center gap-2 text-xs text-blue-600">
                  <span>Progreso: {scanProgress}%</span>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center mb-3">
                  <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <p className="text-center text-sm text-gray-600 mb-2">
                  Mire directamente a la cámara para iniciar el reconocimiento facial.
                </p>
                <p className="text-center text-xs text-gray-500">
                  Su identidad será verificada de acuerdo a los registros del Servicio de Registro Civil e
                  Identificación.
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-green-700">Identidad verificada exitosamente</h4>
            <Button onClick={completeIdentity} size="sm" className="bg-green-600 hover:bg-green-700">
              Continuar
            </Button>
          </div>

          <div className="flex items-center mb-3">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckSquare className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">
                Su identidad ha sido verificada conforme a los estándares de seguridad requeridos.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Facial
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  RUT validado
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  Registro Civil
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
