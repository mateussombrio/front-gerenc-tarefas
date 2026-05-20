import { useState, useEffect, useCallback } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CategoryForm from './components/CategoryForm';
import './App.css';

const API_URL = 'http://localhost:3000/api/tasks'; // Ajustado para o endpoint do backend
const CATEGORY_API_URL = 'http://localhost:3000/api/categories'; 

function App() {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  
  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(CATEGORY_API_URL);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await fetchTasks();
      await fetchCategories();
    })();
  }, [fetchTasks, fetchCategories]);

  const addCategory = async (name) => {
    try {
      const response = await fetch(CATEGORY_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };
  const addTask = async (task) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        fetchTasks();
      } else {
        const errorData = await response.json();
        console.error('Falha na API:', errorData);
      }
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const toggleTaskDone = async (task) => {
    updateTask(task.id, { ...task, isDone: !task.isDone });
  };

  const totalCount = tasks.length;
  const doneCount = tasks.filter((task) => task.isDone).length;
  const pendingCount = totalCount - doneCount;

  return (
    <div className="App">
      <header className="page-header">
        <div className="page-title-block">
          <span className="eyebrow">Plano do dia</span>
          <h1>Gerenciador de Tarefas</h1>
          <p className="page-subtitle">
            Organize categorias, detalhe tarefas e acompanhe o progresso.
          </p>
        </div>
        <div className="kpi-grid">
          <div className="kpi-card">
            <span>Total</span>
            <strong>{totalCount}</strong>
          </div>
          <div className="kpi-card">
            <span>Em aberto</span>
            <strong>{pendingCount}</strong>
          </div>
          <div className="kpi-card">
            <span>Concluidas</span>
            <strong>{doneCount}</strong>
          </div>
        </div>
      </header>

      <section className="forms-grid">
        <div className="panel">
          <div className="panel-header">
            <h2>Nova Categoria</h2>
            <p>Crie grupos para organizar o backlog.</p>
          </div>
          <CategoryForm onAddCategory={addCategory} />
        </div>
        <div className="panel">
          <div className="panel-header">
            <h2>Nova Tarefa</h2>
            <p>Detalhe o que precisa ser feito.</p>
          </div>
          <TaskForm onAdd={addTask} categories={categories} />
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Tarefas</h2>
          <p>Marque como concluido quando finalizar.</p>
        </div>
        <TaskList 
          tasks={tasks} 
          onUpdate={updateTask} 
          onDelete={deleteTask} 
          onToggleDone={toggleTaskDone} 
          categories={categories}
        />
      </section>
    </div>
  );
}

export default App;
