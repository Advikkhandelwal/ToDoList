import axios from 'axios';

export interface Todo {
    _id: string;
    title: string;
}

const API_URL = '/todos';

export const getTodos = async (): Promise<Todo[]> => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createTodo = async (title: string): Promise<Todo> => {
    const response = await axios.post(API_URL, { title });
    return response.data;
};

export const updateTodo = async (id: string, title: string): Promise<Todo> => {
    const response = await axios.put(`${API_URL}/${id}`, { title });
    return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
