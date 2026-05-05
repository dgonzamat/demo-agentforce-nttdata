import type React from "react"
export function downloadDemo(containerRef: React.RefObject<HTMLDivElement>) {
  // Notificar al usuario
  alert("Preparando la grabación. Esta acción puede tardar unos segundos...")

  // Mostrar mensaje de descarga temporal
  const downloadMessage = document.createElement("div")
  downloadMessage.style.position = "fixed"
  downloadMessage.style.bottom = "20px"
  downloadMessage.style.left = "50%"
  downloadMessage.style.transform = "translateX(-50%)"
  downloadMessage.style.padding = "10px 20px"
  downloadMessage.style.backgroundColor = "rgba(59, 130, 246, 0.9)"
  downloadMessage.style.color = "white"
  downloadMessage.style.borderRadius = "5px"
  downloadMessage.style.zIndex = "9999"
  downloadMessage.textContent = "Grabando video MP4 para LinkedIn..."
  document.body.appendChild(downloadMessage)

  // Capturar el contenedor principal como un stream de video
  if (containerRef.current) {
    const stream = containerRef.current.captureStream
      ? containerRef.current.captureStream(30) // 30 FPS
      : containerRef.current.mozCaptureStream
        ? containerRef.current.mozCaptureStream(30)
        : null

    if (!stream) {
      document.body.removeChild(downloadMessage)
      alert("Su navegador no admite la captura de video. Intente con Chrome o Firefox actualizado.")
      return
    }

    // Configurar la grabación
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" })
    const chunks: BlobPart[] = []

    // Eventos de grabación
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    recorder.onstop = () => {
      // Crear un blob con los datos grabados
      const blob = new Blob(chunks, { type: "video/mp4" })

      // Crear una URL para el blob
      const url = URL.createObjectURL(blob)

      // Crear un enlace de descarga
      const a = document.createElement("a")
      a.href = url
      a.download = "AgentForce-Demo.mp4"
      document.body.appendChild(a)
      a.click()

      // Limpiar
      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
        document.body.removeChild(downloadMessage)
        alert("¡Video MP4 descargado exitosamente!")
      }, 100)
    }

    // Comenzar a grabar - grabamos 5 segundos por defecto
    recorder.start()

    // Detener la grabación después de un tiempo establecido
    setTimeout(() => {
      downloadMessage.textContent = "Procesando video MP4..."
      recorder.stop()
    }, 5000) // Grabar 5 segundos (ajustable)
  } else {
    document.body.removeChild(downloadMessage)
    alert("Error al capturar el contenido. Intente nuevamente.")
  }
}
