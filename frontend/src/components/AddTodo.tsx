import React, { useState } from 'react';
import type { Todo } from '../api/todo.api';
import { X, Calendar, Flag, Tag, AlignLeft } from 'lucide-react';
import './AddTodo.css';

interface AddTodoProps {
    onAdd: (todoData: Partial<Todo>) => void;
    onCancel: () => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd, onCancel }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Todo['priority']>('Medium');
    const [category, setCategory] = useState('General');
    const [dueDate, setDueDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd({
            title,
            priority,
            category,
            dueDate: dueDate || undefined,
            description
        });

        setTitle('');
    };

    return (
        <form className="add-todo-container" onSubmit={handleSubmit}>
            <div className="modal-header">
                <h2>Create New Task</h2>
                <button type="button" className="close-btn" onClick={onCancel}>
                    <X size={20} />
                </button>
            </div>

            <div className="form-group">
                <input
                    type="text"
                    className="title-input"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label><Flag size={14} /> Priority</label>
                    <select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="form-group">
                    <label><Tag size={14} /> Category</label>
                    <input
                        type="text"
                        placeholder="Work, Personal..."
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-group">
                <label><Calendar size={14} /> Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label><AlignLeft size={14} /> Description</label>
                <textarea
                    placeholder="Add some details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
            </div>

            <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
                <button type="submit" className="submit-btn" disabled={!title.trim()}>
                    Create Task
                </button>
            </div>
        </form>
    );
};

export default AddTodo;
