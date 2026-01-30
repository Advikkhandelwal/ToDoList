import express, { Application } from "express"
import mongoose from "mongoose"
import { Routes } from "./interfaces/routes.interface"
import TodoRoute from "./routes/todo.route"
import errorHandler from "./middlewares/errorHandler"

interface AppInterface {
  startServer(): Promise<void>
  connectDatabase(): Promise<void>
  initializeRoutes(routes: Routes[]): void
  initializeMiddlewares(): void
  initializeErrorHandling(): void
}

class App implements AppInterface {
  public port: number | string
  public app: Application

  constructor(port: number | string) {
    this.port = port
    this.app = express()

    this.initializeMiddlewares()
    this.initializeRoutes([new TodoRoute()])
    this.initializeErrorHandling()
  }

  public async connectDatabase(): Promise<void> {
    try {
      if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined");
      }
      await mongoose.connect(process.env.MONGO_URI as string)
      console.log("Database connected successfully")
    } catch (err) {
      console.error("Database connection failed:", err)
      process.exit(1)
    }
  }

  public initializeMiddlewares(): void {
    this.app.use(express.json())
  }

  public initializeRoutes(routes: Routes[]): void {
    this.app.get("/", (_req, res) => {
      res.send("API is running")
    })

    routes.forEach((route) => {
      this.app.use("/", route.router)
    })
  }

  public initializeErrorHandling(): void {
    this.app.use(errorHandler)
  }

  public async startServer(): Promise<void> {
    await this.connectDatabase()
    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`)
    })
  }
}

export default App
