import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiRefresh, BiCheckDouble, BiEdit, BiTrash, BiReset, BiCheckCircle } from "react-icons/bi";

const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            if (editIndex !== -1) {
                const updatedTodos = [...todos];
                updatedTodos[editIndex] = { task: inputValue, completed: updatedTodos[editIndex].completed };
                setTodos(updatedTodos);
                setInputValue('');
                setEditIndex(-1);
            } else {
                setTodos([...todos, { task: inputValue, completed: false }]);
                setInputValue('');
            }
        }
    };

    const startEdit = (index) => {
        setInputValue(todos[index].task);
        setEditIndex(index);
    };

    const cancelEdit = () => {
        setInputValue('');
        setEditIndex(-1);
    };

    const removeTodo = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
    };

    const toggleCompleted = (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        setTodos(updatedTodos);
    };

    return (
        <>
            <div className='container1 p-2'>
                <h1>To Do List</h1>
                <div className='forms'>
                    <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className='form-control mx-1 input-fiel' type="text" placeholder='add new task' />

                    {editIndex !== -1 ? (
                        <>
                            <button onClick={addTodo} className='btn btn-outline-primary mx-1 update-btn'><BiCheckDouble /></button>
                            <button onClick={cancelEdit} className='btn btn-outline-primary cancel-btn'><BiRefresh /></button>
                        </>
                    ) : (
                        <button onClick={addTodo} className='btn btn-outline-primary'>add</button>
                    )}
                </div>
                <ul className='list m-1 mt-3'>
                    {
                        todos.map((todo, index) => (
                            <li key={index} className={todo.completed ? 'completed' : ''}>
                                {todo.task}
                                <div className='btn btn-group'>
                                    <button onClick={() => startEdit(index)} className='btn btn-outline-primary'><BiEdit /></button>
                                    <button onClick={() => removeTodo(index)} className="btn btn-outline-primary"><BiTrash /></button>
                                    <button onClick={() => toggleCompleted(index)} className="btn btn-outline-primary">
                                        {todo.completed ? <BiReset /> : <BiCheckCircle />}
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
};

export default ToDoList;
