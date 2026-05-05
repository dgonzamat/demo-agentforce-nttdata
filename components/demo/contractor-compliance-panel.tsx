"use client"

import { Progress } from "@/components/ui/progress"
import { FileCheck, AlertTriangle, Shield, BarChart2 } from "lucide-react"

interface ContractorCompliancePanelProps {
  compliance: {
    overall: number
    documents: number
    safety: number
    quality: number
  }
}

export function ContractorCompliancePanel({ compliance }: ContractorCompliancePanelProps) {
  // Función para determinar el color basado en el porcentaje
  const getColorClass = (percentage: number) => {
    if (percentage >= 95) return "bg-green-500"
    if (percentage >= 85) return "bg-yellow-500"
    if (percentage >= 70) return "bg-orange-500"
    return "bg-red-500"
  }

  // Función para determinar el estado basado en el porcentaje
  const getStatus = (percentage: number) => {
    if (percentage >= 95) return "Cumplimiento Total"
    if (percentage >= 85) return "Cumplimiento Parcial"
    if (percentage >= 70) return "Requiere Atención"
    return "Crítico"
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-blue-600 mb-2 max-w-[90%]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold flex items-center">
          <FileCheck className="h-5 w-5 mr-2 text-blue-600" />
          Estado de Cumplimiento del Contratista
        </h3>
        <div className="text-sm text-blue-600 flex items-center">
          <AlertTriangle className="h-4 w-4 mr-1" />
          {getStatus(compliance.overall)}
        </div>
      </div>

      <div className="space-y-4">
        {/* Cumplimiento general */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="font-medium">Cumplimiento General</span>
            <span className="font-bold">{compliance.overall}%</span>
          </div>
          <Progress value={compliance.overall} className={`h-2 ${getColorClass(compliance.overall)}`} />
        </div>

        {/* Documentación */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="flex items-center">
              <FileCheck className="h-4 w-4 mr-1 text-blue-600" />
              Documentación Legal
            </span>
            <span className="font-bold">{compliance.documents}%</span>
          </div>
          <Progress value={compliance.documents} className={`h-2 ${getColorClass(compliance.documents)}`} />
        </div>

        {/* Seguridad */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="flex items-center">
              <Shield className="h-4 w-4 mr-1 text-blue-600" />
              Cumplimiento de Seguridad
            </span>
            <span className="font-bold">{compliance.safety}%</span>
          </div>
          <Progress value={compliance.safety} className={`h-2 ${getColorClass(compliance.safety)}`} />
        </div>

        {/* Calidad */}
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-1 text-blue-600" />
              Calidad de Servicio
            </span>
            <span className="font-bold">{compliance.quality}%</span>
          </div>
          <Progress value={compliance.quality} className={`h-2 ${getColorClass(compliance.quality)}`} />
        </div>

        {/* Información adicional */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <h4 className="text-sm font-semibold mb-2">Documentos críticos</h4>
          <div className="space-y-2">
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>F30-1: Vigente (7 días restantes)</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span>Póliza de seguro: Vence mañana</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Certificados trabajo en altura: 3 vencidos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
