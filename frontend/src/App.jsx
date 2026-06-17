import { use, useEffect, useState } from 'react'
import Usestate from '../components/useState'
import './App.css'
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';

function App() {

  const [text, setText] = useState("");
  const [newtext, setNewtext] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [editId, setEditId] = useState();
  const [todos, setTodos] = useState(() => {
    const existingTodos = localStorage.getItem("todos");
    return existingTodos ? JSON.parse(existingTodos): [];
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-neutral-100">
      
      <div className="shadow-2xl rounded-xl p-2 w-[800px] bg-white">
        <div><TodoForm todos={todos} setTodos={setTodos} text={text} setText={setText} /></div>
        <div className="mt-10">
          <TodoList text={text} setText={setText} todos={todos} setTodos={setTodos} showPopUp={showPopUp} setShowPopUp={setShowPopUp} newtext={newtext} setNewtext={setNewtext} editId={editId} setEditId={setEditId} />
        </div>
      </div>
    </div>
  )
}

export default App
