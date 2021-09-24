import cuid from 'cuid'

export const SESSION_ID = cuid()
const PUBLIC_DOMAIN = process.env.NEXT_PUBLIC_PUBLIC_DOMAIN
export const ENV = process.env.NEXT_PUBLIC_VERCEL_ENV

export const PUBLIC_URL = `http${
  !PUBLIC_DOMAIN.includes('localhost') ? 's' : ''
}://${PUBLIC_DOMAIN}`
