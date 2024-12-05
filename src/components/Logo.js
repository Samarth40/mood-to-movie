import React from 'react';

const Logo = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-8 h-8">
        {/* Lens Shape */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#f472b6] opacity-50 blur-sm"></div>
        <div className="absolute inset-0.5 rounded-full bg-[#1e293b] ring-2 ring-[#38bdf8]/50"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#f472b6]"></div>
        {/* Lens Reflection */}
        <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-white/70"></div>
      </div>
      <span className="text-2xl font-bold">
        <span className="text-[#38bdf8]">Mood</span>
        <span className="text-[#f472b6]">Lens</span>
      </span>
    </div>
  );
};

export default Logo;
