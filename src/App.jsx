import { useState } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([{id:1, text:"Task 1"}, {id:2, text:"Task 2"}, {id:3, text:"Task 3"}])
  return (
    <>
      <Header />
      <ToDoList todos={todos}/>
    </>
  )
}

export default App
