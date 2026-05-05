"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Check, Lock, FileText } from "lucide-react"

interface SignaturePanelProps {
  signatureComplete: boolean
  completeSignature: () => void
}

export function SignaturePanel({ signatureComplete, completeSignature }: SignaturePanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-orange-400 mb-2 max-w-[90%]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <Lock className="h-5 w-5 mr-2 text-orange-600" />
          Firma Electrónica Avanzada
        </h3>
        <div className="text-sm text-orange-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          Conforme a Ley 19.799
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between mb-2 text-sm">
          <span>Progreso</span>
          <span>Firma Digital</span>
        </div>
        <Progress value={signatureComplete ? 100 : 50} className="h-2" />
      </div>

      <div className="text-center">
        {signatureComplete ? (
          <div className="mb-3 text-center">
            <div className="flex justify-center mb-2">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h4 className="font-medium text-lg mb-1">Firma completada exitosamente</h4>
            <p className="text-sm text-gray-600">El documento ha sido firmado y registrado conforme a la Ley 19.799</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-orange-100 p-3 rounded-lg">
                <FileText className="h-6 w-6 text-orange-700" />
              </div>
              <div className="text-left">
                <h4 className="font-medium">Contrato de Portabilidad Financiera</h4>
                <p className="text-sm text-gray-600">Crédito Hipotecario - Ley 21.236</p>
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <img src="/firma-electronica-logo.png" alt="Firma Electrónica" className="h-12" />
            </div>
            <p className="text-sm text-gray-600 mb-3">Procesando firma electrónica avanzada...</p>
            {!signatureComplete && (
              <Button onClick={completeSignature} className="bg-orange-600 hover:bg-orange-700 mb-2">
                Completar firma
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
