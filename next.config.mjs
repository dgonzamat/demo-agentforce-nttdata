/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Asegurar que las redirecciones sean consistentes
  async redirects() {
    return [
      // Redirigir /page a /seguros para mantener compatibilidad con enlaces existentes
      {
        source: '/page',
        destination: '/seguros/demo',
        permanent: true,
      },
      // Redirigir /seguros a /seguros/demo para mantener consistencia
      {
        source: '/seguros',
        destination: '/seguros/demo',
        permanent: false,
      },
      // Redirigir /telecom a /telecom/demo para mantener consistencia
      {
        source: '/telecom',
        destination: '/telecom/demo',
        permanent: false,
      },
      // Redirigir /retail a /retail/demo para mantener consistencia
      {
        source: '/retail',
        destination: '/retail/demo',
        permanent: false,
      },
      // Redirigir /airline a /airline/demo para mantener consistencia
      {
        source: '/airline',
        destination: '/airline/demo',
        permanent: false,
      },
      // Redirigir /mineria a /mineria/demo para mantener consistencia
      {
        source: '/mineria',
        destination: '/mineria/demo',
        permanent: false,
      },
      // Redirigir /servicios-basicos a /servicios-basicos/demo para mantener consistencia
      {
        source: '/servicios-basicos',
        destination: '/servicios-basicos/demo',
        permanent: false,
      },
      // Redirigir /infographic-old a /infographic para mantener consistencia
      {
        source: '/infographic-old',
        destination: '/infographic',
        permanent: true,
      }
    ]
  },
}

export default nextConfig
