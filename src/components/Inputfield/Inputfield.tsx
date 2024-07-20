import React from 'react';

interface Props {
  toDo: string; 
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  handleAddToDo: (text: string) => void;
}

const InputField: React.FC<Props> = ({ toDo, setToDo ,handleAddToDo}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (toDo.trim()) {
      handleAddToDo(toDo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex max-w-screen-sm px-4 w-full gap-3'>
      <input 
        type="text" 
        placeholder='Enter a Task' 
        className='w-full p-3 rounded-md outline-none'
        value={toDo}
        onChange={handleInputChange}
      />
      <button type='submit' className='bg-white border-2 p-1 rounded-md hover:bg-gray-500 hover:text-white'>
        Submit
      </button>
    </form>
  );
};

export default InputField;
