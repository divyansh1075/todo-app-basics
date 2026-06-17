import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { IoIosClose } from "react-icons/io";


export default function TodoList({text, setText, todos, setTodos, showPopUp, setShowPopUp, newtext, setNewtext, editId, setEditId}){

    function completetask(idtocomplete){
        setTodos(todos.map((todo) => 
            todo.id === idtocomplete ? {...todo, completed : !todo.completed} : todo
        ))
    }

    function deleteindex(idtodelete){
        setTodos(todos.filter((todo) => todo.id !== idtodelete))
    }

    function edittext(){
        setTodos(
            todos.map((todo) => 
                todo.id === editId ? {...todo, text : newtext}: todo
            )
        )
        setShowPopUp(false);
    }
    
    return(
        <div>
            <div>{showPopUp && (
                    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                        <div className="bg-white px-6 py-3 rounded-lg ">
                            <div className=" mb-4 flex justify-between w-full">
                                <div className="flex items-center gap-4 ">
                                    <div className="border-1 rounded-full p-2 bg-violet-100 border-violet-300 text-violet-700"><GoPencil size={18}/></div>
                                    <div className="mt-2">
                                        <div className="font-[600] text-gray-900 mb-[2px]">Edit Todo</div>
                                        <div className="text-[10px] text-gray-500">Update your todo and click save</div>
                                    </div>
                                </div>
                                <div className="translate-x-3">
                                    <button onClick={() => setShowPopUp(false)} className="text-gray-700 cursor-pointer"><IoIosClose size={30}/></button>
                                </div>
                            </div>
{/*this is edit input */ }  <input type='text' className="border-[1px] rounded-lg border-violet-600 p-1 px-2" placeholder="Enter text..." onChange={(e) => setNewtext(e.target.value)}></input><br></br>
                            <div className="flex justify-center mt-7">
                                <button className="border-[1px] rounded-md border-violet-400 px-6 py-1 text-lg cursor-pointer bg-violet-500 text-white" onClick={() => edittext()}>Submit</button>
                            </div>
                        </div>
                    </div>
                )
                }
            </div>
            {todos.map((todo, index) => (
                <div className="flex my-5 mx-7  gap-5 border-1 rounded-lg bg-white  px-5 py-3 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 border border-gray-200" key={todo.id}>
                    {/* {todo.completed ? "✅ " : "⬜ "} */}
                    <div className="flex w-full justify-between items-center">
                        <div className="flex gap-7 items-center">
                            <input type="checkbox" checked={todo.completed} onChange={() => completetask(todo.id) } className=" w-5 h-5 border-2 border-gray-300 accent-violet-600 cursor-pointer"></input>
                            <p key={todo.id} className={`px-2 ${todo.completed ? "line-through text-gray-500" : ""}`}>{todo.text}</p>
                        </div>
                        <div className="flex gap-[15px]">
                            <button className="border-1 border-red-100 rounded-md px-2 bg-red-100 text-red-600 font-medium flex gap-2 items-center px-4 py-2 text-lg cursor-pointer scale-100 hover:scale-105 transition-all duration-200" onClick={() => deleteindex(todo.id)} > <FaRegTrashAlt />Delete</button>
                            <button className="border-[1px] px-4 py-2 rounded-md bg-violet-100 border-purple-100 text-lg flex items-center gap-2 text-violet-700 font-medium cursor-pointer scale-100 hover:scale-105 transition-all duration-200" onClick={() => {setShowPopUp(true); setEditId(todo.id) }}> <GoPencil /> Edit todo</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}