import React from "react";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem"
import Button from "./components/Button"
import './style.css'

const App = () => {
  return (
    <div className="todo-container">
      <Header header="TODO"/>
      <TodoItem text="DSA"/>
      <TodoItem completed={true} text="Full Stack"/>
      <TodoItem text="Machine Learning"/>
      <TodoItem text="Cyber Security"/>
      <Button />
    </div>
  );
};

export default App;