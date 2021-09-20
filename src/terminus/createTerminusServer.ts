import http from 'http'
import { Application } from 'express'
import { Logger } from '../logger/createLogger'
import { HealthCheckOptions, ShutdownOptions } from '../createAPIServer.types'

export const createTerminusServer = <
  Dependencies extends Record<string, any> = Record<string, unknown>
>({
  app,
}: {
  dependencies: Dependencies
  app: Application
  logger: Logger
  healthCheckOptions: HealthCheckOptions<Dependencies> | undefined
  shutdownOptions: ShutdownOptions<Dependencies>
}) => {
  const server = http.createServer(app)

  return server
}
