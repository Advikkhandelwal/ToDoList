import { Request, Response, NextFunction } from "express"
import TodoService from "../services/todo.service"

class TodoController {
    public createTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { title } = req.body
            if (!title) {
                res.status(400).json({ error: "Title is required" });
                return;
            }
            const todo = await TodoService.createTodo(req.body)
            res.status(201).json(todo)
        } catch (error) {
            next(error)
        }
    }

    public getTodos = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todos = await TodoService.getTodos()
            res.status(200).json(todos)
        } catch (error) {
            next(error)
        }
    }

    public getTodoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todo = await TodoService.getTodoById(req.params.id as string)
            if (!todo) {
                res.status(404).json({ error: "Todo not found" })
                return;
            }
            res.status(200).json(todo)
        } catch (error) {
            next(error)
        }
    }

    public updateTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todo = await TodoService.updateTodo(req.params.id as string, req.body)
            if (!todo) {
                res.status(404).json({ error: "Todo not found" })
                return;
            }
            res.status(200).json(todo)
        } catch (error) {
            next(error)
        }
    }

    public deleteTodo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const todo = await TodoService.deleteTodo(req.params.id as string)
            if (!todo) {
                res.status(404).json({ error: "Todo not found" })
                return;
            }
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}

export default new TodoController()
