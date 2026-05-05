export function validateRut(rut: string): boolean {
  // Eliminar puntos y guión
  const cleanRut = rut.replace(/\./g, "").replace(/-/g, "")

  // Obtener dígito verificador
  const dv = cleanRut.slice(-1).toUpperCase()
  const rutNumber = Number.parseInt(cleanRut.slice(0, -1), 10)

  // Calcular dígito verificador
  let sum = 0
  let factor = 2

  // Sumar dígitos multiplicados por factor
  for (let i = rutNumber.toString().length - 1; i >= 0; i--) {
    sum += Number.parseInt(rutNumber.toString().charAt(i), 10) * factor
    factor = factor === 7 ? 2 : factor + 1
  }

  // Calcular dígito verificador esperado
  const expectedDV = 11 - (sum % 11)
  const calculatedDV = expectedDV === 11 ? "0" : expectedDV === 10 ? "K" : expectedDV.toString()

  // Comparar dígito verificador calculado con el proporcionado
  return calculatedDV === dv
}
