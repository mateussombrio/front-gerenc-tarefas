import { useState } from 'react';
import TaskForm from './TaskForm';

function TaskItem({ task, onUpdate, onDelete, onToggleDone, categories }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedData) => {
    onUpdate(task.id, { ...task, ...updatedData });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <TaskForm 
          initialData={task} 
          onAdd={handleUpdate} 
          onCancel={() => setIsEditing(false)}
          categories={categories}
        />
      </div>
    );
  }

  return (
    <div className={`task-item ${task.isDone ? 'done' : ''}`}>
      <div className="task-content">
        <input 
          type="checkbox" 
          checked={task.isDone} 
          onChange={onToggleDone} 
        />
        <div className="task-details">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          {task.category && <span className="category-badge">{task.category.name}</span>}
        </div>
      </div>
      <div className="task-actions">
        <button onClick={() => setIsEditing(true)}>Editar</button>
        <button onClick={onDelete}>Remover</button>
      </div>
    </div>
  );
}

export default TaskItem;
