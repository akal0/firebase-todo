import { FormEvent, useEffect, useState } from "react";
import Todo from "./components/Todo";

import { db } from "./firebase/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const App = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");

  console.log(todos);

  // Funcs

  // Create todo
  const createTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo === "") {
      alert("Please enter the input field!");
      return;
    }

    await addDoc(collection(db, "todos"), {
      text: newTodo,
      completed: false,
    });

    setNewTodo("");
  };

  // Read todo
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray: any[] = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });

      setTodos(todosArray);
    });

    return () => unsubscribe();
  }, []);

  // Update todo
  const toggleComplete = async (todo: Todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className="bg-gradient-to-br from-[#0d0d0d] to-[#181818] min-w-screen min-h-screen flex items-center font-Arial font-bold">
      <div className="bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl px-6 pt-8 pb-5">
        <h3 className="text-2xl text-center text-gray-800">
          Firebase - Todo App
        </h3>

        <form
          onSubmit={(e) => createTodo(e)}
          className="flex justify-between mt-4"
        >
          <input
            className="border border-slate-300 px-5 w-full bg-slate-200 rounded-sm"
            type="text"
            placeholder="Add todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />

          <button
            type="submit"
            className="border border-slate-300 p-4 ml-2 hover:bg-slate-200 transition-all rounded-sm text-xl text-slate-300 hover:text-slate-700"
          >
            +
          </button>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        <p className="text-center p-2 mt-2">
          {todos.length < 1
            ? "Start creating some todos!"
            : `You have ${
                todos.filter((todo) => todo.completed === false).length
              } todos left!`}
        </p>
      </div>
    </div>
  );
};

export default App;
