// src/components/MainComponent.js
import React, { useState } from 'react';
import Modal from './Modal.jsx';

const MainComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (data) => {
    console.log('Submitted Data:', data);
    // You can handle the submitted data here (e.g., send it to a server)
  };

  return (
    <div style={{ padding: '20px' }}>
      <button style={buttonStyle} onClick={handleOpenModal}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmit} />
    </div>
  );
};

 
export default MainComponent;
