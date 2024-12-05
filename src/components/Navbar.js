import React from 'react';
import Logo from './Logo';

const Navbar = ({ onHowItWorks }) => {
  return (
    <nav className="fixed w-full z-50 bg-[#0f172a]/80 backdrop-blur-sm border-b border-[#334155]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <button
            onClick={onHowItWorks}
            className="px-4 py-2 bg-[#1e293b] text-[#38bdf8] rounded-lg hover:bg-[#334155] transition-colors duration-150"
          >
            How It Works
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
