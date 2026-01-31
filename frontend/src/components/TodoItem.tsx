import React, { useState } from 'react';
import type { Todo } from '../api/todo.api';
import './TodoItem.css';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: string, title: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleUpdate = () => {
        if (editTitle.trim() !== todo.title) {
            onUpdate(todo._id, editTitle);
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    }

    return (
        <div className="todo-item">
            {isEditing ? (
                <input
                    type="text"
                    className="todo-edit-input"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onBlur={handleUpdate}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
                    {todo.title}
                </span>
            )}

            <div className="todo-actions">
                <button className="todo-btn edit-btn" onClick={() => setIsEditing(!isEditing)} title="Edit">
                    ✎
                </button>
                <button className="todo-btn delete-btn" onClick={() => onDelete(todo._id)} title="Delete">
                    ×
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
