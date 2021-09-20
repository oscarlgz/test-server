import { APIServer, ContextResolver, CreateAPIOptions } from './createAPIServer.types'
import { createExpressApp } from './app/createExpressApp'
import { createLogger } from './logger/createLogger'
import { createRouteHandler } from './router/createRouteHandler'
import { createTerminusServer } from './terminus/createTerminusServer'

export const createAPIServer = <
  Dependencies extends Record<string, any> = Record<string, unknown>,
  Context extends Record<string, any> = Record<string, unknown>
>(
  options: CreateAPIOptions<Dependencies>,
  dependencies: Dependencies = {} as Dependencies,
  contextResolver: ContextResolver<Dependencies, Context>
): APIServer<Dependencies, Context> => {
  const {
    environment,
    healthCheck,
    shutdown = {},
    cors = false,
    isPublic = true,
    behindProxy = false,
    compress = false,
    jsonLimit,
    parseCookies = false,
    prefix = '',
  } = options

  const logger = createLogger()

  const app = createExpressApp({
    environment,
    isPublic,
    behindProxy,
    compress,
    jsonLimit,
    parseCookies,
    corsOptions: cors,
  })

  const router = createRouteHandler<Dependencies, Context>(
    app,
    dependencies,
    {
      prefix,
      environment,
    },
    contextResolver
  ) as any

  const server = createTerminusServer<Dependencies>({
    dependencies,
    app,
    logger,
    healthCheckOptions: healthCheck,
    shutdownOptions: shutdown,
  })

  return {
    getApp: () => app,
    router,
    listen: (port, callback) => {
      server.listen(port, callback)
    },
    close: () => {
      server.close()
    },
  }
}
