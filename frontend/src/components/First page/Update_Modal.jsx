// src/components/Modal.js
import React, { useContext, useEffect, useState } from "react";
import "./Attendance_Modal.css"; // Import the CSS file
import { IdContext } from "../../context/IdContext";
import { LoadingContext } from "../../context/LoadingContext";
 
 
const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;
  const {loading,SetLoading} = useContext(LoadingContext);
  const userId = useContext(IdContext);
  const id = userId.attendance_id;
   
   
  const [formData, setFormData] = useState({
    subject: "",
    class_absents: "",
    total_classes: "",
  });
  
   

  const handleUpdate = async () => {
    let response;
    // SetLoading(true);
    try {
      response = await fetch(`/api/attendance/${id}`, {
        method: 'GET',
      });
      const responseData = await response.json();
      

      if (!responseData.attendance) {
        console.log("No available data");
      } else {
        console.log("Fetched attendance data:", responseData);
        setFormData({
          subject:responseData.attendance.subject,
          class_absents:responseData.attendance.class_absents,
          total_classes:responseData.attendance.total_classes
        })
      }
    } catch (error) {
      console.error("Error fetching update data:", error);
    }finally{
       SetLoading(false);
     

    }
  };

  useEffect(() => {
    handleUpdate();
  }, [loading,SetLoading]); 

 
  
   
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
      class_absents: Number(formData.class_absents),
      total_classes: Number(formData.total_classes),
    };
    try {
      await fetch(`/api/attendance/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });
  
    } catch (error) {
      console.log("Got error in Update Attendance",error);
    }finally{
      SetLoading(false);

    }
   
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Update Details</h2>

          <div className="form-group">
            <label htmlFor="subject" style={{ color: "black" }}>
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="class_absents">Class Absents</label>
            <input
              type="number"
              id="class_absents"
              name="class_absents"
              value={formData.class_absents}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="total_classes">Total classes</label>
            <input
              type="number"
              id="total_classes"
              name="total_classes"
              value={formData.total_classes}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
