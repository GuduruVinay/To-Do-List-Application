import { useState } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import './App.css'

function App() {
  // state: list of todos
  const [todos, setTodos] = useState([])
  // state: input for new todo
  const [newText, setNewText] = useState("")
  
  // function: add todo
  const handleAdd = (e) => {
    e.preventDefault();
    const text = newText.trim();
    if (!text) return;
    const newToDo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos((prev) => [newToDo, ...prev]);
    setNewText("");
  }

  // function: delete todo
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  // function: toggle completed
  const handleToggle = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  // function: edit todo
  const handleEdit = (id, newText) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)))
  }

  return (
    <div>
      <Header />
      <main>
        <form onSubmit={handleAdd}>
          <input 
            type="text" 
            placeholder="Add a new task..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ToDoList 
          todos={todos}
          onDelete={handleDelete}
          onToggle={handleToggle}
          onEdit={handleEdit}
        />
      </main>
    </div>
  )
}

export default App
