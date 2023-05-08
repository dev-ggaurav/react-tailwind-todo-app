import { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [newTask, setNewTask] = useState("");

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: newTask, completed:false},
      ]
    })

    setNewTask("");
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed}
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-200">
        <h1 className="text-4xl font-medium">To-Do List</h1>

        <form onSubmit={handleSubmit} className="my-10">
            <div className="flex flex-col space-y-5">
                <label htmlFor="newtask">
                    <input placeholder="Add New To-Do" id="newtask"  type="text" 
                    value={newTask}
                    onChange={e => setNewTask(e.target.value)} 
                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-300" />
                </label>
               
                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                      <span>Add New Task</span>
                </button>
            </div>
        </form>
        <ul className="task-list text-2xl font-medium text-slate-800">
          {todos.length === 0 && "No Tasks"}
          {todos.map(todo => {
            return(
              <li key={todo.id} className="task bg-slate-100 rounded-lg px-4 py-2 mt-2 flex items-center">
                <input className="h-6 w-6" type="checkbox" checked = {todo.completed} onChange={ e => toggleTodo(todo.id, e.target.checked)} />
                <p className="text-2xl grow ml-4 font-normal text-slate-950">{todo.title}</p>
                <button onClick={ () => deleteTodo(todo.id)} className="inline-flex items-center justify-center w-8 h-8 mr-2 text-pink-100 transition-colors duration-150 bg-rose-600 rounded-full focus:shadow-outline hover:bg-rose-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            )
          })}
        </ul>
    </div>
  )
}
