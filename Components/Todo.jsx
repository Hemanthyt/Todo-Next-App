import React from "react";

const Todo = ({ todo, index, deleteTodo, completeTodo }) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index}
      </th>
      <td className={`px-6 py-4 ${todo.isCompleted ? "line-through" : ""}`}>
        {todo.title}
      </td>
      <td className={`px-6 py-4 ${todo.isCompleted ? "line-through" : ""}`}>
        {todo.description}
      </td>
      <td className="px-6 py-4">
        {todo.isCompleted ? "Completed" : "Pending"}
      </td>
      <td className="px-6 py-4 flex gap-1">
        <button
          onClick={() => deleteTodo(todo._id)}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete
        </button>
        {todo.isCompleted ? (
          ""
        ) : (
          <button
            onClick={() => completeTodo(todo._id)}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Done
          </button>
        )}
      </td>
    </tr>
  );
};

export default Todo;
