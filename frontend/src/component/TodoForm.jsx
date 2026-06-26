import axios from "axios";
export default function TodoForm({fetchTodo, todos, setTodos, text, setText}){

    const trimmed = text.trim();
    const addTodo = async() => {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/todo`, {
            text : trimmed
        });
        await fetchTodo();
        setText("");
       
    }

    return(
        <div className="flex gap-3 mx-7 pt-5">
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="border-2 border-violet-600 rounded-lg bg-white w-full px-3 py-3" placeholder="Enter a new todo..."></input>
            <button onClick={() => addTodo()} className="border-[1px] rounded-lg px-4 py-1 bg-violet-600 text-white flex items-center gap-4 shrink-0 text-xl cursor-pointer scale-100 hover:scale-105 transition-all duration-200">Add todo<span className="text-3xl">+</span></button>
        </div>
    )
}