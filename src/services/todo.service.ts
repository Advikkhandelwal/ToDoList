import TodoModel, { Todo_interface } from "../schema/todo.schema"

class TodoService {
  public async createTodo(data: Partial<Todo_interface>): Promise<Todo_interface> {
    const todo = new TodoModel(data)
    return await todo.save()
  }

  public async getTodos(): Promise<Todo_interface[]> {
    return await TodoModel.find().sort({ createdAt: -1 })
  }

  public async getTodoById(id: string): Promise<Todo_interface | null> {
    return await TodoModel.findById(id)
  }

  public async updateTodo(id: string, data: Partial<Todo_interface>): Promise<Todo_interface | null> {
    return await TodoModel.findByIdAndUpdate(id, data, { new: true })
  }

  public async deleteTodo(id: string): Promise<Todo_interface | null> {
    return await TodoModel.findByIdAndDelete(id)
  }
}

export default new TodoService()