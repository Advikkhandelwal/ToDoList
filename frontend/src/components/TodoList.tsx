import React, { useEffect, useState, useMemo } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../api/todo.api';
import type { Todo } from '../api/todo.api';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';
import { Search, Filter, Moon, Sun, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './TodoList.css';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');

    // Search and Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');
    const [priorityFilter, setPriorityFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchTodos();
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

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

    const handleAddTodo = async (todoData: Partial<Todo>) => {
        try {
            const newTodo = await createTodo(todoData);
            setTodos([newTodo, ...todos]);
            setIsAddModalOpen(false);
        } catch (err) {
            console.error('Failed to create todo', err);
            setError('Failed to create todo.');
        }
    };

    const handleUpdateTodo = async (id: string, updates: Partial<Todo>) => {
        try {
            const updated = await updateTodo(id, updates);
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

    const filteredTodos = useMemo(() => {
        return todos.filter(todo => {
            const matchesSearch = todo.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === 'All' ||
                (statusFilter === 'Completed' ? todo.isCompleted : !todo.isCompleted);
            const matchesPriority = priorityFilter === 'All' || todo.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesPriority;
        });
    }, [todos, searchQuery, statusFilter, priorityFilter]);

    return (
        <div className="todo-list-container">
            <header className="app-header">
                <div className="header-top">
                    <h1 className="app-title">Todo <span>List</span></h1>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                <div className="controls-row">
                    <div className="search-box">
                        <Search size={18} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filters">
                        <div className="filter-group">
                            <Filter size={16} />
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)}>
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value as any)}>
                            <option value="All">All Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <button className="add-main-btn" onClick={() => setIsAddModalOpen(true)}>
                        <Plus size={20} />
                        <span>Add Task</span>
                    </button>
                </div>
            </header>

            {isAddModalOpen && (
                <div className="modal-overlay">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="modal-content"
                    >
                        <AddTodo onAdd={handleAddTodo} onCancel={() => setIsAddModalOpen(false)} />
                    </motion.div>
                </div>
            )}

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Loading your tasks...</p>
                </div>
            ) : (
                <div className="todo-items">
                    <AnimatePresence mode="popLayout">
                        {filteredTodos.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="empty-state"
                            >
                                <p>No tasks found.</p>
                            </motion.div>
                        ) : (
                            filteredTodos.map((todo) => (
                                <TodoItem
                                    key={todo._id}
                                    todo={todo}
                                    onUpdate={handleUpdateTodo}
                                    onDelete={handleDeleteTodo}
                                />
                            ))
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default TodoList;
