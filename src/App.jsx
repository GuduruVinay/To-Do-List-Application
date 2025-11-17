import { useState } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

function App() {
  // state: list of todos
  const [todos, setTodos] = useState([])
  // state: input for new todo
  const [newText, setNewText] = useState("")
  // state: filter todo
  const [filterTodos, setFilterTodos] = useState("all")
  
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

  // function: clear completed tasks
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  // function: filtered todos
  const filteredTodos = todos.filter((todo) => {
    if (filterTodos === "active") return !todo.completed
    if (filterTodos === "completed") return todo.completed
    return true
  })

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
        <Header />
        <main>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full" /*className="text-gray-600"*/>
              {todos.length - todos.filter((t) => !t.completed).length} / {todos.length} Tasks Completed
            </span>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded-full" /*className="text-gray-600"*/>
              {todos.filter((t) => !t.completed).length} / {todos.length} Tasks Remaining
            </span>
            <button 
              onClick={handleClearCompleted}
              className="text-red-600 px-3 py-1 border border-red-300 rounded hover:bg-red-50"
            >Clear Completed</button>
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-green-500 rounded-full transition-all"
              style={{width:`${((todos.length - todos.filter((t) => !t.completed).length) / todos.length) * 100}%`}}
            ></div>
          </div>
          <div className="flex gap-2 mt-3">
            {["all", "active", "completed"].map((type) => (
              <button
                key={type}
                onClick={() => setFilterTodos(type)}
                className={`px-3 py-1 rounded border ${
                  filterTodos === type
                   ? "bg-blue-600 text-white border-blue-600"
                   : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          <form onSubmit={handleAdd} className="flex gap-3 mt-4">
            <input
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2" 
              type="text" 
              placeholder="Add a new task..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700" 
              type="submit"
            >
              Add
            </button>
          </form>
          <ToDoList 
            todos={filteredTodos}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        </main>
      </div>
    </div>
  )
}

export default App
