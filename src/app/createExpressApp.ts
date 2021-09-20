import express from 'express'
import { CorsOptions } from 'cors'
import { Environment } from '../createAPIServer.types'

export const createExpressApp = (_: {
  environment: Environment
  isPublic: boolean
  behindProxy: boolean
  compress: boolean
  jsonLimit: number | string | undefined
  parseCookies: string | boolean
  corsOptions: CorsOptions | boolean
}) => {
  const app = express()

  return app
}
