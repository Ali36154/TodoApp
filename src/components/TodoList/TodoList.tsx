import React, { useState, useRef, useEffect } from 'react';
import { Todo } from '../../model';
import { MdDelete } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";

interface Props {
  toDos: Todo[];
  setToDos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<Props> = ({ toDos, setToDos }) => {
  const [editId, setEditId] = useState<number | null>(null);
  const [newText, setNewText] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleDone = (id: number) => {
    setToDos(toDos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
  };

  const handleDelete = (id: number) => {
    setToDos(toDos.filter(todo => todo.id !== id));
  };

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setNewText(text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(e.target.value);
  };

  const handleSave = (id: number) => {
    setToDos(toDos.map(todo => todo.id === id ? { ...todo, todo: newText } : todo));
    setEditId(null);
    setNewText("");
  };

  useEffect(() => {
    if (editId !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  return (
    <div className="todo-list w-full max-w-screen-sm p-5">
      {toDos.map(todo => (
        <div
          key={todo.id}
          style={{
            backgroundColor: todo.isDone ? '#FFD700' : '#FF7F7F'
          }}
          className="todo-item rounded-lg m-3 p-3 flex justify-between"
        >
          {editId === todo.id ? (
            <input
              className="px-2 outline-none bg-transparent"
              type="text"
              value={newText}
              onChange={handleChange}
              ref={inputRef}
            />
          ) : (
            <span
              className="px-2"
              style={{
                textDecoration: todo.isDone ? 'line-through' : 'none',
              }}
            >
              {todo.todo}
            </span>
          )}
          <div className='w-1/6 flex justify-around'>
            <button onClick={() => handleToggleDone(todo.id)}>
              {todo.isDone ? <FaUndo /> : <IoCheckmarkDoneSharp />}
            </button>
            <button onClick={() => handleDelete(todo.id)}><MdDelete /></button>
            {editId === todo.id ? (
              <button onClick={() => handleSave(todo.id)}><IoSaveOutline /></button>
            ) : (
              <button onClick={() => handleEdit(todo.id, todo.todo)}><CiEdit /></button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
