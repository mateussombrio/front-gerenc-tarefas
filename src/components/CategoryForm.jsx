import { useState } from 'react';

function CategoryForm({ onAddCategory }) {
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    onAddCategory(categoryName);
    setCategoryName(''); // Limpa o campo
  };

  return (
    <form onSubmit={handleSubmit} className="category-form">
      <input
        type="text"
        placeholder="Nova categoria (ex: Trabalho, Estudos)"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />
      <button type="submit">Criar Categoria</button>
    </form>
  );
}

export default CategoryForm;