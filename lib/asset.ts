export const basePath = process.env.NODE_ENV === "production" ? "/demo-agentforce-nttdata" : ""

export function asset(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${basePath}${normalized}`
}
