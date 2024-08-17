import React, { useState } from "react";
import "./AttendanceCard.css";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
// import Update_Attendance from "./Update_Attendance";
import Modal from "./Update_Modal";
 

const AttendanceCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data) => {
    console.log("Submitted Data:", data);
    // You can handle the submitted data here (e.g., send it to a server)
  };
  const handleUpdate = ()=>{
     props.onUpdate();
     handleOpenModal();
      
  }


  return (
    <div className="attendance-card">
      <div className="attendance-details">
        <div className="attendance-card__subject">
          Subject: <span>{props.subject}</span>
        </div>
         
        <div className="attendance-card__class-attended">
          Class Absents: {props.classAbsent}
        </div>
        <div className="attendance-card__class-attended">
          Total Classes: {props.totalClasses}
        </div>
        <div className="attendance-card__percentage">
          Attendance: {props.percentage}%
        </div>
      </div>

      <div className="icons">
       <MdEdit className="edit-icon" onClick={handleUpdate} />
       
        <MdDelete className="delete-icon" onClick={props.onDelete}/>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AttendanceCard;
