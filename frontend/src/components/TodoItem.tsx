import React, { useState } from 'react';
import type { Todo } from '../api/todo.api';
import { Calendar, Trash2, Edit2, ChevronDown, ChevronUp, CheckCircle, Circle, Clock, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './TodoItem.css';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: string, updates: Partial<Todo>) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleComplete = () => {
        onUpdate(todo._id, { isCompleted: !todo.isCompleted });
    };

    const handleUpdateTitle = () => {
        if (editTitle.trim() !== todo.title) {
            onUpdate(todo._id, { title: editTitle });
        }
        setIsEditing(false);
    };

    const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.isCompleted;

    const getPriorityColor = () => {
        switch (todo.priority) {
            case 'High': return 'var(--priority-high)';
            case 'Medium': return 'var(--priority-medium)';
            case 'Low': return 'var(--priority-low)';
            default: return 'var(--text-muted)';
        }
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`todo-item-card ${todo.isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
        >
            <div className="item-main-row">
                <button className="complete-toggle" onClick={handleToggleComplete}>
                    {todo.isCompleted ?
                        <CheckCircle size={22} className="check-icon" /> :
                        <Circle size={22} className="uncheck-icon" />
                    }
                </button>

                <div className="title-section">
                    {isEditing ? (
                        <input
                            type="text"
                            className="edit-input"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onBlur={handleUpdateTitle}
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitle()}
                            autoFocus
                        />
                    ) : (
                        <span className="todo-title-text" onDoubleClick={() => setIsEditing(true)}>
                            {todo.title}
                        </span>
                    )}

                    <div className="badge-row">
                        <span className="priority-badge" style={{ color: getPriorityColor() }}>
                            {todo.priority}
                        </span>
                        <span className="category-tag">
                            <Tag size={10} /> {todo.category}
                        </span>
                        {todo.dueDate && (
                            <span className={`due-date-badge ${isOverdue ? 'danger' : ''}`}>
                                <Clock size={10} /> {new Date(todo.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>

                <div className="item-actions">
                    <button className="action-btn expand-btn" onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    <button className="action-btn edit-btn" onClick={() => setIsEditing(true)}>
                        <Edit2 size={18} />
                    </button>
                    <button className="action-btn delete-btn" onClick={() => onDelete(todo._id)}>
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="item-expanded-content"
                    >
                        <div className="description-text">
                            {todo.description || "No description provided."}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default TodoItem;
