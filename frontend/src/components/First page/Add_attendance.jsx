import React from "react";
import "./Add_attendance.css";
import { IoIosAddCircle } from "react-icons/io";

// src/components/MainComponent.js
import { useState } from "react";
import Modal from "./Attendance_Modal.jsx";

const Add = () => {
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

  return (
    <div className="add-card">
      <IoIosAddCircle
        size={100}
        className="add-icon"
        onClick={handleOpenModal}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Add;
