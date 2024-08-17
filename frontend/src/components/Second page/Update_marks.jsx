import React, { useState } from "react";
import Modal from "./Update_modal.jsx";
import { MdEdit } from "react-icons/md";
const Update_Marks = () => {
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
    <div>
      <MdEdit 
      className="edit-icon" 
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

export default Update_Marks;
