import express, { Application } from "express"
import mongoose from "mongoose"

interface AppInterface {
  startServer(): Promise<void>
  connectDatabase(): Promise<void>
  initializeRoutes(): void
}

class App implements AppInterface {
  public port: number | string
  public app: Application

  constructor(port: number | string) {
    this.port = port
    this.app = express()

    this.initializeRoutes()
  }

  public async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(process.env.MONGO_URI as string)
      console.log("Database connected successfully")
    } catch (err) {
      console.error("Database connection failed:", err)
      process.exit(1)
    }
  }

  public initializeRoutes(): void {
    this.app.use(express.json())

    this.app.get("/", (_req, res) => {
      res.send("API is running")
    })
  }

  public async startServer(): Promise<void> {
    await this.connectDatabase()

    this.app.listen(this.port, () => {
      console.log(`Server running on http://localhost:${this.port}`)
    })
  }
}

export default App
