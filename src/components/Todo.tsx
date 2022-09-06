import React from "react";

const Todo: React.FC<any> = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li
      className={
        todo.completed
          ? "flex justify-between bg-slate-300 p-4 my-2 capitalize border border-gray-400 rounded-sm text-gray-600 cursor-pointer"
          : "flex justify-between bg-slate-200 p-4 my-2 capitalize border border-gray-300 rounded-sm text-gray-700 cursor-pointer"
      }
      onClick={() => toggleComplete(todo)}
    >
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          className="w-3 h-3 border border-slate-800 accent-slate-600 focus:ring-2 focus:ring-slate-500 rounded focus:ring-offset-slate-200 focus:ring-offset-2 rounded"
          onChange={() => toggleComplete(todo)}
        />
        <p
          className={
            todo.completed
              ? "ml-4 cursor-pointer select-none line-through"
              : "ml-4 cursor-pointer select-none"
          }
        >
          {todo.text}
        </p>
      </div>

      <button
        className="cursor-pointer flex items-center bg-slate-400 hover:bg-slate-600 px-3 py-1 rounded-sm transition-all group"
        onClick={() => deleteTodo(todo.id)}
      >
        <p className="text-gray-300 group-hover:text-gray-100 transition-all text-xs">
          X
        </p>
      </button>
    </li>
  );
};

export default Todo;
