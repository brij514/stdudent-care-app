import React from "react";
import { MdDelete } from "react-icons/md";
import './Todo.css'

const ToDoItem = (props) => {
  return (
    <div  className="main-container-notes"> 
      <div className="ToDoItem_component">
        <li>{props.text}</li>
      </div>
      
       <MdDelete 
        className="delete-icon-todo" 
        onClick={() => props.onDelete(props.id)} 
      />
    </div>
  );
}

export default ToDoItem;
