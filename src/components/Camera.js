import React from 'react';
import Webcam from 'react-webcam';

const Camera = ({ webcamRef, onCapture, onCancel }) => {
  return (
    <div className="camera-container">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-xl"
        mirrored={true}
      />
      <div className="camera-overlay"></div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={onCapture}
          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Capture & Detect Mood
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Camera;
