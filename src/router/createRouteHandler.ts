import { Express } from 'express'
import { ContextResolver } from '../createAPIServer.types'

export const createRouteHandler = <Dependencies, Context>(
  _app: Express,
  _deps: Dependencies,
  _options: any,
  _contextResolver: ContextResolver<Dependencies, Context>
) => {
  return {}
}
