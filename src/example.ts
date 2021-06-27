import { Application, EchoServer, PlatformExpress } from './application'

const main = async () => {
  const app: Application = await PlatformExpress.bootstrap(EchoServer)
  await app.listen()
  console.log(`App is listening on port=${app.port}`)
}

main()