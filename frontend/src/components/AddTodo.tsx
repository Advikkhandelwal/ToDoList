import React, { useState } from 'react';
import './AddTodo.css';

interface AddTodoProps {
    onAdd: (title: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAdd(title);
        setTitle('');
    };

    return (
        <form className="add-todo-form" onSubmit={handleSubmit}>
            <input
                type="text"
                className="add-todo-input"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" className="add-todo-btn">
                Add Task
            </button>
        </form>
    );
};

export default AddTodo;
