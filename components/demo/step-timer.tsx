interface StepTimerProps {
  seconds: number
}

export function StepTimer({ seconds }: StepTimerProps) {
  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-full shadow-lg p-2 flex items-center">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold">
        {seconds}
      </div>
      <span className="ml-2 mr-3 text-sm font-medium">Siguiente paso</span>
    </div>
  )
}
