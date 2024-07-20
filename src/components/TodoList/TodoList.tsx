import React from 'react';
import { Todo } from '../../model';
import { MdDelete } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
interface Props {
  toDos: Todo[];
  setToDos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList: React.FC<Props> = ({ toDos, setToDos }) => {
  const handleToggleDone = (id: number) => {
    setToDos(toDos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
  };

  const handleDelete = (id: number) => {
    setToDos(toDos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todo-list w-full max-w-screen-sm p-5">
      {toDos.map(todo => (
        <div key={todo.id} style={{
            backgroundColor: todo.isDone ? '#FFD700' : '	#FF7F7F'
          }} className="todo-item rounded-lg m-3 p-3 flex  justify-between">
          <span
            className="px-2"
            style={{
              textDecoration: todo.isDone ? 'line-through' : 'none',
              
            }}
          >
            {todo.todo}
          </span>
          <div className='w-1/6 flex justify-around'>
          <button onClick={() => handleToggleDone(todo.id)}>
            {todo.isDone ? <span><FaUndo /></span> : <IoCheckmarkDoneSharp />}
          </button>
          <button onClick={() => handleDelete(todo.id)}><MdDelete /></button>
          </div>
          
        </div>
      ))}
    </div>
  );
};
