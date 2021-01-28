import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import './App.css';


const LS = 'todoApp.todos'


function App() {

  
  const [todos, setTodos] = useState([])

  
  const todoNameRef = useRef()

  
  function addTodos(e) {
    const name = todoNameRef.current.value
    if (name === "")
    return 
    setTodos(prevTodos => {
      return [...prevTodos, { id: n + 1, name: name, complete: false}]
    })
    console.log(name)
    todoNameRef.current.value = null
    const n = 1 + todos.length;
  }


  function clearTodos(e) {
    const clearTodo = todos.filter(todo => todo.complete && !todo.complete)
    setTodos(clearTodo)  
  }


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LS))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  
  
  useEffect(() => {
    localStorage.setItem(LS, JSON.stringify(todos) )
  }, [todos])


  function toggleTodo(id) { 
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  return (
    <>
    <div className="App">
      
      
      <header className="App-header">
      <h1>To-Do</h1>
      <p>Welcome to your To-do Application!</p>
      </header>
    
      <input ref={todoNameRef} type="text" placeholder="Add Task"></input>
      <button className="add" onClick={addTodos}>Add</button>
      <button className="del" onClick={clearTodos}>Clear All</button>
      
      <div className="count">you have {todos.filter(todo => !todo.complete).length} tasks left</div>
      <div className="todos">
      <TodoList  todos={todos} toggleTodo = {toggleTodo}/>
      </div>
    </div>      
    </>
  );
}

export default App;
