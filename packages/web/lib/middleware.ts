import pino from 'pino'

const logger = pino({
  base: {
    ENV: process.env.NEXT_PUBLIC_VERCEL_ENV
  }
})

export function log(namespace: string) {
  return (req, res, next) => {
    req.log = logger.child({ context: namespace })
    next()
  }
}

