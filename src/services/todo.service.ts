import TodoModel, { Todo_interface } from "../schema/todo.schema"

class TodoService {
  public async createTodo(title: string): Promise<Todo_interface> {
    const todo = new TodoModel({ title })
    return await todo.save()
  }

  public async getTodos(): Promise<Todo_interface[]> {
    return await TodoModel.find()
  }

  public async getTodoById(id: string): Promise<Todo_interface | null> {
    return await TodoModel.findById(id)
  }

  public async updateTodo(id: string, title: string): Promise<Todo_interface | null> {
    return await TodoModel.findByIdAndUpdate(id, { title }, { new: true })
  }

  public async deleteTodo(id: string): Promise<Todo_interface | null> {
    return await TodoModel.findByIdAndDelete(id)
  }
}

export default new TodoService()