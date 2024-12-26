"use client";
import Todo from "@/Components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((form) => ({ ...form, [name]: value }));
    console.log(formData);
  };
  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get("/api");
    setTodoData(response.data.todos);
    console.log(response.data.todos);
  };

  const deleteTodo = async (id) => {
    const response = await axios.delete("/api", {
      params: {
        mongoId: id,
      },
    });
    toast.success(response.data.message);
    await fetchTodos();
  };

  const completeTodo = async (id) => {
    const response = await axios.put(
      "/api",
      {},
      {
        params: {
          mongoId: id,
        },
      }
    );
    toast.success(response.data.message);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api", formData);
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos();
    } catch (error) {
      toast.error("Error");
    }
  };
  return (
    <>
      <ToastContainer theme="dark" />
      <form
        onSubmit={onSubmitHandler}
        action=""
        className=" flex items-start flex-col w-[80%] gap-2 max-w-2xl mt-24 mx-auto"
      >
        <input
          value={formData.title}
          onChange={onChangeHandler}
          type="text"
          className="px-3 py-2 border-2 w-full"
          placeholder="Enter Title"
          name="title"
          id=""
        />
        <textarea
          value={formData.description}
          onChange={onChangeHandler}
          className="px-3 py-2 border-2 w-full"
          placeholder="Enter Description"
          name="description"
        ></textarea>
        <button
          type="submit"
          className="px-11 py-3 text-white bg-orange-600 rounded"
        >
          Add Todo
        </button>
      </form>

      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((todo, index) => (
              <Todo
                todo={todo}
                key={index}
                index={index + 1}
                deleteTodo={deleteTodo}
                completeTodo={completeTodo}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
