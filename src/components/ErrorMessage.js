import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="p-4 text-red-400 bg-red-900/20 rounded-lg mb-4 border border-red-800">
      {message}
    </div>
  );
};

export default ErrorMessage;
