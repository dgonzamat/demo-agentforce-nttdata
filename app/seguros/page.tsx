import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[#f0f4f8] p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <img src="/ntt-data-logo.png" alt="NTT DATA" className="h-12 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">AgentForce Demo Center</h1>
          <p className="text-gray-600">Demostraciones interactivas para diferentes sectores</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-blue-600"
              >
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Seguros
            </h2>
            <p className="text-gray-600 mb-4">
              Demostración del proceso de atención al cliente y venta de seguros utilizando AgentForce.
            </p>
            <Link href="/seguros" passHref>
              <Button className="w-full">Ver Demo</Button>
            </Link>
          </div>

          <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 text-blue-600"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
              Banca
            </h2>
            <p className="text-gray-600 mb-4">
              Demostración del proceso de portabilidad financiera según la Ley 21.236 utilizando AgentForce.
            </p>
            <Link href="/banking" passHref>
              <Button className="w-full">Ver Demo</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">© 2023 NTT DATA. Todos los derechos reservados.</div>
    </div>
  )
}
