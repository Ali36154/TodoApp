import React, { useState } from "react";
import "./App.css";
import InputField from "./components/Inputfield/Inputfield";
import { Todo } from "./model";
import { TodoList } from "./components/TodoList/TodoList";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [toDos, setToDos] = useState<Todo[]>([]);

  const handleAddToDo = (newToDoText: string) => {
    const newToDo: Todo = {
      id: Date.now(), // Using timestamp for unique ID
      todo: newToDoText,
      isDone: false,
    };
    setToDos([...toDos, newToDo]);
    setToDo(""); // Clear input field after adding
  };

  return (
    <div className="flex flex-col items-center h-screen w-full bg-blue-400">
      <div className="neucha-regular my-4 text-2xl z-10">My ToDo App</div>
      <InputField toDo={toDo} setToDo={setToDo} handleAddToDo={handleAddToDo} />
      <TodoList toDos={toDos} setToDos={setToDos} />
    </div>
  );
};

export default App;
