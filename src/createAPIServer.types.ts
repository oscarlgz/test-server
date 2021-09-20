import { Application, Request } from 'express'
import { CorsOptions } from 'cors'

export type Environment = 'development' | 'test' | 'staging' | 'production'

export interface ShutdownOptions<Dependencies> {
  teardown?: (dependencies: Dependencies) => void | Promise<void>
  beforeShutdown?: (dependencies: Dependencies) => void | Promise<void>
  gracefulTerminationTimeout?: number | string
  readinessPropIntervalSeconds?: number | string
  maxAcceptableRequestDuration?: number | string
  readinessProbeFailureThreshold?: number | string
}

export interface HealthCheckOptions<Dependencies> {
  endpoint: string
  onHealthCheck?: (dependencies: Dependencies) => void | Promise<void>
}

export interface CreateAPIOptions<
  Dependencies extends Record<string, any> = Record<string, unknown>
> {
  name: string
  environment: Environment
  isPublic?: boolean
  behindProxy?: boolean
  compress?: boolean
  jsonLimit?: number | string
  parseCookies?: boolean | string
  cors?: boolean | CorsOptions
  shutdown?: ShutdownOptions<Dependencies>
  healthCheck?: HealthCheckOptions<Dependencies>
  prefix?: string
}

interface Router<Dependencies, Context> {
  deps: Dependencies
  ctx: Context
}

export interface APIServer<
  Dependencies extends Record<string, any> = Record<string, unknown>,
  Context extends Record<string, any> = Record<string, unknown>
> {
  getApp: () => Application
  router: Router<Dependencies, Context>
  listen: (port: number | string, callback?: () => void) => void
  close: () => void
}

export type ContextResolver<
  Dependencies extends Record<string, any> = Record<string, unknown>,
  Context extends Record<string, any> = Record<string, unknown>
> = (request: Request, dependencies: Dependencies) => Context | Promise<Context>
