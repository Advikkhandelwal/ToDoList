import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todo.api';
import type { Todo } from '../api/todo.api';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            const data = await getTodos();
            setTodos(data);
        } catch (err) {
            setError('Failed to fetch todos.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTodo = async (title: string) => {
        try {
            const newTodo = await createTodo(title);
            setTodos([...todos, newTodo]);
        } catch (err) {
            console.error('Failed to create todo', err);
            setError('Failed to create todo. Please try again.');
        }
    };

    const handleUpdateTodo = async (id: string, title: string) => {
        try {
            const updated = await updateTodo(id, title);
            setTodos(todos.map((todo) => (todo._id === id ? updated : todo)));
        } catch (err) {
            console.error('Failed to update todo', err);
            setError('Failed to update todo.');
        }
    };

    const handleDeleteTodo = async (id: string) => {
        try {
            await deleteTodo(id);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (err) {
            console.error('Failed to delete todo', err);
            setError('Could not delete todo.');
        }
    };

    return (
        <div className="todo-list-container">
            <h1 className="app-title">Todo List</h1>
            <AddTodo onAdd={handleAddTodo} />

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading tasks...</div>
            ) : (
                <div className="todo-items">
                    {todos.length === 0 ? (
                        <div className="empty-state">No tasks here. Add one above!</div>
                    ) : (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                onUpdate={handleUpdateTodo}
                                onDelete={handleDeleteTodo}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default TodoList;
