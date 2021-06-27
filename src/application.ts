import express, { Application as ExpressApplication } from 'express'

export interface Type<T = any> extends Function {
  new (...args: any[]): T
}

export interface Application {
  listen: () => Promise<void>
  port: number
}

export type PlatformApplication
  = ExpressApplication

export interface Server {
  readonly app: PlatformApplication
}

export interface Platform {
  bootstrap: (serverModule: Type<Server>) => Promise<Application>
}

const PORT: number = 
  process.env.PORT
    ? parseInt(process.env.PORT)
    : 8314


const bootstrapExpress = async (serverModule: Type<Server>): Promise<Application> => {
  const server = new serverModule()
  
  const application: Application = {
    port: PORT,
    listen: async () => {
      server.app.listen(PORT)
    }
  }

  return application
}

export const PlatformExpress: Platform = {
  bootstrap: bootstrapExpress
}

export class EchoServer implements Server {
  readonly app: PlatformApplication

  constructor() {
    this.app = express()
    this.app.use(express.json())

    this.app.get('/', (req, res) => {
      let reqMs: string
      if (req.body) {
        if (req.body.msg) {
          reqMs = req.body.msg
        } else {
          reqMs = 'no msg'
        }
      } else {
        reqMs = 'no body'
      }

      console.log(reqMs)

      res.status(200)
        .send({msg: reqMs})
    })
  }
}