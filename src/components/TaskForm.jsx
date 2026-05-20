import { useState } from 'react';

function TaskForm({ onAdd, initialData = null, onCancel = null, categories = [] }) {
  const [title, setTitle] = useState(initialData ? initialData.title : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [category, setCategory] = useState(initialData && initialData.category ? initialData.category.id : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAdd({ 
      title, 
      description, 
      category: category ? Number(category) : null,
      isDone: initialData ? initialData.isDone : false 
    });
    
    if (!initialData) {
      setTitle('');
      setDescription('');
      setCategory('');
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Título da Tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <input
          type="text"
          placeholder="Descrição da Tarefa"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="input-group">
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Sem categoria</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="actions-group">
        <button type="submit">{initialData ? 'Atualizar' : 'Adicionar'}</button>
        {onCancel && <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}

export default TaskForm;
