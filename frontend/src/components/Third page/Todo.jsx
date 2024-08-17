import React, { useContext, useEffect, useState } from "react";
import ToDoItem from "./TodoItem.jsx";
import { InputArea, all } from "./InputArea";
import "./Todo.css";
import { LoadingContext } from "../../context/LoadingContext.jsx";

const App= () => {
  const [items, setItems] = useState([]);

  const {loading,SetLoading} = useContext(LoadingContext);
 

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await fetch('/api/notes/get');
        const data = await response.json();
        setItems(data.notes);
        console.log(data);
      } catch (error) {
        console.error("Error fetching marks data:", error);
      }finally{
        SetLoading(false);
      }
    };

    fetchMarks();
  }, [loading,SetLoading]);

  const deleteItem = async (id) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: 'DELETE',
      });
      setItems(items.filter(item => item._id !== id));
    } catch (error) {
      console.error("Error deleting attendance data:", error);
    }
  };

  return (
     <div className="notes-main-container">

    
    <div className="main_container">
      <div className="container-notes">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <InputArea />
        <div>
          <ol className="whole_list">
            {(all?all:items).map((todoItem, index) => (
              <div className="input_div">
                <ToDoItem
                  key={index}
                  id={index}
                  text={todoItem.toDo}
                  onDelete={()=>deleteItem(todoItem._id)}
                />
              </div>
            ))}
          </ol>
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
