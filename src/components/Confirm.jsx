import React from 'react';
import ResetBtn from './ResetBtn';
import SubmitBtn from './SubmitBtn';

const ConfirmModal = ({ message = 'Are you sure?', onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4 sm:px-0">
      <div className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-md sm:max-w-sm">
        <p className="text-base sm:text-lg font-semibold text-center mb-4">{message}</p>
        <div className="flex justify-between gap-4">
          <SubmitBtn
            onClick={onConfirm}
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 text-sm sm:text-base"
          >
            Confirm
          </SubmitBtn>
          <ResetBtn
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-300 text-black hover:bg-gray-400 text-sm sm:text-base"
          >
            Cancel
          </ResetBtn>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
