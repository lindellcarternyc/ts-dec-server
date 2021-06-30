import { Application, PlatformApplication, Server } from './interfaces'
import { PlatformExpress } from './application'
import express from 'express'

class EchoServer implements Server {
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
      
      res.status(200)
        .send({msg: reqMs})
    })
  }
}

const main = async () => {
  const app: Application = await PlatformExpress.bootstrap(EchoServer)
  await app.listen()
  console.log(`App is listening on port=${app.port}`)
}

main()