// src/components/Modal.js
import React, { useContext, useState } from "react";
import "./Modal.css"; // Import the CSS file
import { LoadingContext } from "../../context/LoadingContext";
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from "../UIElements/loadingSpinner";




const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const navigateTo = useNavigate();
  const {loading,SetLoading} = useContext(LoadingContext);
  const [formData, setFormData] = useState({
    subject: "",
    test1: "",
    test2: "",
    mid_sem: "",
    end_sem: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
   SetLoading(true);
    const dataToSubmit = {
      ...formData,
      test1: Number(formData.test1),
      test2: Number(formData.test2),
      mid_sem: Number(formData.mid_sem),
      end_sem: Number(formData.end_sem),
    };
    try {
      const response = await fetch("api/marks/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });
    } catch (error) {
      console.log("Got error in Marks Post Modal", error);
    }finally{
      SetLoading(false); 
      navigateTo("/marks");
      navigateTo("/marks");
      
       
    }
    onClose();

    
  };

  return (
 
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Enter Details</h2>

          <div className="form-group">
            <label htmlFor="subject" style={{ color: "black" }}>
              Subject
            </label>
            <input type="text" id="subject" name="subject"
            value={formData.subject}
            onChange={handleChange}
             required />
          </div>

          <div className="test-marks">
            <div className="form-group">
              <label htmlFor="test1">Test 1</label>
              <input
                type="number"
                id="test1"
                name="test1"
                value={formData.test1}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="test2">Test 2</label>
              <input
                type="number"
                id="test2"
                name="test2"
                value={formData.test2}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="mid_sem">Mid Sem Marks</label>
            <input
              type="number"
              id="mid_sem"
              name="mid_sem"
              value={formData.mid_sem}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end_sem">End Sem Marks</label>
            <input
              type="number"
              id="end_sem"
              name="end_sem"
              value={formData.end_sem}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
     );
};

export default Modal;
