import { Application, Platform, Server, Type } from './interfaces'

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