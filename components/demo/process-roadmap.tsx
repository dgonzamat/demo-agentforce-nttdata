import { Check, Clock } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface ProcessStage {
  id: number
  name: string
  icon: LucideIcon
  color: string
}

interface ProcessRoadmapProps {
  stages: ProcessStage[]
  currentStage: number
}

export function ProcessRoadmap({ stages, currentStage }: ProcessRoadmapProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-2 mb-3">
      <h3 className="text-sm font-semibold mb-2 flex items-center">
        <Clock className="h-4 w-4 mr-1 text-blue-600" />
        Etapas del Proceso
      </h3>
      <div className="overflow-x-auto">
        <div className="flex min-w-max">
          {stages.map((stage, index) => {
            const StageIcon = stage.icon
            const isActive = currentStage === stage.id
            const isCompleted = currentStage > stage.id
            const colorClass = isActive
              ? `bg-${stage.color}-100 text-${stage.color}-800 border-${stage.color}-500`
              : isCompleted
                ? "bg-green-100 text-green-800 border-green-500"
                : "bg-gray-100 text-gray-500 border-gray-300"

            return (
              <div key={stage.id} className="flex items-center">
                <div className={`flex flex-col items-center ${index === 0 ? "" : "ml-1"}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${colorClass} border-2`}>
                    {isCompleted ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <StageIcon className={`h-4 w-4 ${isActive ? `text-${stage.color}-600` : "text-gray-400"}`} />
                    )}
                  </div>
                  <span
                    className={`text-[9px] mt-1 font-medium text-center w-14 ${isActive ? "text-blue-800" : isCompleted ? "text-green-800" : "text-gray-500"}`}
                  >
                    {stage.name}
                  </span>
                </div>
                {index < stages.length - 1 && (
                  <div className={`h-0.5 w-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
