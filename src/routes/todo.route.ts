import { Router } from "express"
import TodoController from "../controllers/todo.controller"

class TodoRoute {
    public path = "/todos"
    public router = Router()
    public todoController = TodoController

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, this.todoController.createTodo)
        this.router.get(`${this.path}`, this.todoController.getTodos)
        this.router.get(`${this.path}/:id`, this.todoController.getTodoById)
        this.router.put(`${this.path}/:id`, this.todoController.updateTodo)
        this.router.delete(`${this.path}/:id`, this.todoController.deleteTodo)
    }
}

export default TodoRoute
