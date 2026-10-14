import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  message: string; // Accept dynamic message as a prop
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null; // If not open, don't render anything

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Form Submitted!
        </h2>
        <p className="text-center text-lg mb-6">{message}</p>{" "}
        {/* Display dynamic message */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#FF7703] text-white px-6 py-2 rounded-md hover:bg-[#FF7703] focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
