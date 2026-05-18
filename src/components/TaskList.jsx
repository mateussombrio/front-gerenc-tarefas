import TaskItem from './TaskItem';

function TaskList({ tasks, onUpdate, onDelete, onToggleDone, categories }) {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa encontrada.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          onUpdate={onUpdate} 
          onDelete={() => onDelete(task.id)} 
          onToggleDone={() => onToggleDone(task)} 
          categories={categories}
        />
      ))}
    </div>
  );
}

export default TaskList;
