// src/components/Modal.js
import React, { useContext, useEffect, useState } from "react";
import "./Modal.css"; // Import the CSS file
import { IdContext } from "../../context/IdContext";
import { LoadingContext } from "../../context/LoadingContext";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const {loading,SetLoading} = useContext(LoadingContext);
  const userId = useContext(IdContext);
  const id = userId.attendance_id;
  

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
    try{
    await fetch(`api/marks/update/${id}`, {
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
  useEffect(() => {
    handleSubmit();
  }, [loading,SetLoading]); 




  
  const handleUpdate = async () => {
    let response;
    // SetLoading(true);
    try {
      response = await fetch(`api/marks/${id}`, {
        method: 'GET',
      });
      const responseData = await response.json();
    

      if (!responseData.mark) {
        console.log("No available data");
      } else {
        console.log("Fetched attendance data:", responseData);
        setFormData({
          subject:responseData.mark.subject,
          test1:responseData.mark.test1,
          test2:responseData.mark.test2,
          mid_sem:responseData.mark.mid_sem,
          end_sem:responseData.mark.end_sem,
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


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <h2>Update Details</h2>

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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
