import React, { useContext, useState } from "react";
import "./Todo.css";
import { LoadingContext } from "../../context/LoadingContext";

 
 var all;
const  InputArea = (props)=> {
  const [inputText, setInputText] = useState("");
const [notes,setNotes] = useState([]);
const {loading,SetLoading} = useContext(LoadingContext);


 const handleChange= (event) =>{
    const newValue = event.target.value;
    setInputText(newValue);
     
  }
   function addItem(inputText) {
    setNotes((prevItems) => {
      return [...prevItems, inputText];
    });
    
  }
 
  const handleClick = ()=>{
    addItem();
    handleAdd();
  }

  const handleAdd = async() => {
    SetLoading(true);
    try {
      if (inputText !== "") {
      
        await fetch("/api/notes/new", {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({newNotes: inputText}),
         })
           .then((response) => response.json())
            
           .catch((error) => {
             console.error("Error:", error);
           }); setInputText("");
       } 
    } catch (error) {
      console.log("Got error while Fetching notes",error)
    }finally{
      SetLoading(false);
    }
    
    
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button onClick={handleClick}>
        <span>Add</span>
      </button>
    </div>
  );
}

export { InputArea, all };
