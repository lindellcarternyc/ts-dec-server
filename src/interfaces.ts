import { Application as ExpressApplication } from 'express'

export interface Type<T = any> extends Function {
  new (...args: any[]): T
}

export interface Application {
  listen: () => Promise<void>
  port: number
}

export interface Platform {
  bootstrap: (serverModule: Type<Server>) => Promise<Application>
}

export type PlatformApplication
  = ExpressApplication

export interface Server {
  readonly app: PlatformApplication
}