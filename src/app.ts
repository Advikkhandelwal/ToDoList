import express, { Application, Request, Response, NextFunction } from "express"
import mongoose from "mongoose"
import TodoService from "./todo.service"
import errorHandler from "./middlewares/errorHandler"

interface AppInterface {
  startServer(): Promise<void>
  connectDatabase(): Promise<void>
  initializeRoutes(): void
  todoRoutes(): void
}

class App implements AppInterface {
  public port: number | string
  public app: Application

  constructor(port: number | string) {
    this.port = port
    this.app = express()

    this.initializeRoutes()
    this.todoRoutes()
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

  public todoRoutes(): void {
    // Todo routes
    this.app.post("/todos", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { title } = req.body
        const todo = await TodoService.createTodo(title)
        res.status(201).json(todo)
      } catch (error) {
        next(error)
      }
    })

    this.app.get("/todos", async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const todos = await TodoService.getTodos()
        res.status(200).json(todos)
      } catch (error) {
        next(error)
      }
    })

    this.app.get("/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const todo = await TodoService.getTodoById(req.params.id)
        if (!todo) {
          return res.status(404).json({ error: "Todo not found" })
        }
        res.status(200).json(todo)
      } catch (error) {
        next(error)
      }
    })

    this.app.put("/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { title } = req.body
        const todo = await TodoService.updateTodo(req.params.id, title)
        if (!todo) {
          return res.status(404).json({ error: "Todo not found" })
        }
        res.status(200).json(todo)
      } catch (error) {
        next(error)
      }
    })

    this.app.delete("/todos/:id", async (req: Request, res: Response, next: NextFunction) => {
      try {
        const todo = await TodoService.deleteTodo(req.params.id)
        if (!todo) {
          return res.status(404).json({ error: "Todo not found" })
        }
        res.status(204).send()
      } catch (error) {
        next(error)
      }
    })

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
