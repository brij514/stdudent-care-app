import React, { useState } from "react";
import "./MarksCard.css";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import Update_marks from "./Update_marks";
import Modal from "./Update_modal";

const MarksCard = (props) => {

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
    <div className="marks-card">
      <div>
        <div className="marks-card__subject">
          Subject: <span>{props.subject}</span>
        </div>
        <div className="test-marks">
          <div className="marks-card__test">Test 1: {props.test1}</div>
          ||
          <div className="marks-card__test">Test 2: {props.test2}</div>
        </div>
        <div className="marks-card__test">Mid sem Marks: {props.mid_sem}</div>
        <div className="marks-card__test">End sem Marks: {props.end_sem} </div>
      </div>
      <div className="icons">
      <MdEdit className="edit-icon" onClick={handleUpdate}/>
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

export default MarksCard;
