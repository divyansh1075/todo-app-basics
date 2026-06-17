import { useEffect, useState } from 'react'
import Usestate from '../components/useState'
import './App.css'
import TodoForm from './component/TodoForm';
import TodoList from './component/TodoList';
import axios from 'axios';

function App() {

  const [text, setText] = useState("");
  const [newtext, setNewtext] = useState("");
  const [showPopUp, setShowPopUp] = useState(false);
  const [editId, setEditId] = useState();
  const [todos, setTodos] = useState([]);

  const fetchTodo = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todo');
      setTodos(response.data);

    } catch(err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchTodo();
  }, [])

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-neutral-100">
      
      <div className="shadow-2xl rounded-xl p-2 w-[800px] bg-white">
        <div><TodoForm fetchTodo={fetchTodo} todos={todos} setTodos={setTodos} text={text} setText={setText} /></div>
        <div className="mt-10">
          <TodoList text={text} setText={setText} todos={todos} setTodos={setTodos} showPopUp={showPopUp} setShowPopUp={setShowPopUp} newtext={newtext} setNewtext={setNewtext} editId={editId} setEditId={setEditId} />
        </div>
      </div>
    </div>
  )
}

export default App
