import React, { useState, useEffect } from 'react';
import './App.css';

// importing Components
import Form from './components/Form'
import TodoList from './components/TodoList'


function App() {
  // state sfuff
  const [inputText, setInputText] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [status, setStatus] = React.useState("all");
  const [filteredTodos, setFilterTodos] = useState([]);

  //run once when the app start
  useEffect (() => {
    getLocalTodos();
  }, [])

  // use effect
    useEffect(() => {
      filterHandler();
      saveLocalTodos();
    }, [todos, status]
    )

  // function
  const filterHandler = () =>{
    switch(status){
      case 'completed':
        setFilterTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilterTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilterTodos(todos);
        break;
    }
  }

  // save to local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'));
      setTodos(todoLocal);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Ed's Todo List</h1>
      </header>
      <Form 
        todos={todos} 
        setTodos={setTodos} 
        inputText={inputText} 
        setInputText={setInputText}
        setStatus = {setStatus}
      />
      <TodoList 
        setTodos={setTodos} 
        todos={todos} 
        filteredTodos={filteredTodos}
      />
    </div>
    
  );
}

export default App;
