import axios from 'axios';

export interface Todo {
    _id: string;
    title: string;
    isCompleted: boolean;
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: string;
    description?: string;
    category: string;
    createdAt?: string;
}

const API_URL = '/todos';

export const getTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTodo = async (todoData: Partial<Todo>): Promise<Todo> => {
    const response = await axios.post(API_URL, todoData);
    return response.data;
};

export const updateTodo = async (id: string, todoData: Partial<Todo>): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/${id}`, todoData);
    return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
