// Este script es para identificar y limpiar archivos duplicados
// Ejecutar con: npx tsx scripts/clean-duplicates.tsx

import fs from "fs"
import path from "path"
import crypto from "crypto"

const PUBLIC_DIR = path.join(process.cwd(), "public")

interface FileInfo {
  path: string
  hash: string
  size: number
}

// Función para calcular el hash de un archivo
function calculateFileHash(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath)
  const hashSum = crypto.createHash("md5")
  hashSum.update(fileBuffer)
  return hashSum.digest("hex")
}

// Función para escanear directorio y encontrar duplicados
async function findDuplicates(directory: string): Promise<Record<string, FileInfo[]>> {
  const duplicates: Record<string, FileInfo[]> = {}
  const files = fs.readdirSync(directory)

  console.log(`Escaneando ${files.length} archivos en ${directory}...`)

  for (const file of files) {
    const filePath = path.join(directory, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      // Recursivamente escanear subdirectorios
      const subDuplicates = await findDuplicates(filePath)
      Object.keys(subDuplicates).forEach((hash) => {
        if (!duplicates[hash]) {
          duplicates[hash] = []
        }
        duplicates[hash].push(...subDuplicates[hash])
      })
    } else {
      const hash = calculateFileHash(filePath)
      if (!duplicates[hash]) {
        duplicates[hash] = []
      }
      duplicates[hash].push({
        path: filePath,
        hash,
        size: stats.size,
      })
    }
  }

  // Filtrar solo los hashes que tienen más de un archivo
  return Object.fromEntries(Object.entries(duplicates).filter(([_, files]) => files.length > 1))
}

// Función principal
async function main() {
  console.log("Buscando archivos duplicados...")
  const duplicates = await findDuplicates(PUBLIC_DIR)

  console.log("\nArchivos duplicados encontrados:")
  let totalDuplicates = 0
  let totalSize = 0

  Object.entries(duplicates).forEach(([hash, files]) => {
    console.log(`\nHash: ${hash}`)
    files.forEach((file) => {
      console.log(`  - ${file.path} (${(file.size / 1024).toFixed(2)} KB)`)
    })

    // Contar duplicados (todos menos uno por hash)
    totalDuplicates += files.length - 1
    // Sumar tamaño de duplicados
    totalSize += files.slice(1).reduce((sum, file) => sum + file.size, 0)
  })

  console.log(`\nTotal de archivos duplicados: ${totalDuplicates}`)
  console.log(`Espacio desperdiciado: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)

  console.log("\nPara eliminar los duplicados, ejecute este script con --clean")

  // Si se pasa el argumento --clean, eliminar duplicados
  if (process.argv.includes("--clean")) {
    console.log("\nEliminando duplicados...")

    Object.values(duplicates).forEach((files) => {
      // Mantener el primer archivo, eliminar los demás
      files.slice(1).forEach((file) => {
        console.log(`Eliminando ${file.path}`)
        fs.unlinkSync(file.path)
      })
    })

    console.log(`\n${totalDuplicates} archivos duplicados eliminados.`)
  }
}

main().catch(console.error)
