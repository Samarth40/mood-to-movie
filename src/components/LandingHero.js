import React, { useState } from 'react';
import HowItWorks from './HowItWorks';

const EmotionBubble = ({ emoji, text, delay }) => (
  <div 
    className={`absolute animate-float opacity-0`}
    style={{
      animation: `float 15s infinite ${delay}s, fade-in 0.5s ${delay}s forwards`,
    }}
  >
    <div className="flex items-center gap-2 bg-[#1e293b] backdrop-blur-sm px-4 py-2 rounded-full border border-[#334155] hover:border-[#38bdf8]/50 transition-colors duration-300">
      <span className="text-2xl">{emoji}</span>
      <span className="text-[#f8fafc] text-sm font-medium">{text}</span>
    </div>
  </div>
);

const LandingHero = ({ onStart }) => {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const emotions = [
    { emoji: "😊", text: "Happy", position: "top-20 left-[10%]", delay: 0 },
    { emoji: "😢", text: "Sad", position: "top-40 right-[15%]", delay: 0.3 },
    { emoji: "😮", text: "Surprised", position: "bottom-32 left-[20%]", delay: 0.6 },
    { emoji: "😠", text: "Angry", position: "top-16 right-[25%]", delay: 0.9 },
    { emoji: "😐", text: "Neutral", position: "bottom-20 right-[30%]", delay: 1.2 },
  ];

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden pt-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#0f172a]"></div>
      </div>

      {/* Floating Emotion Bubbles */}
      {emotions.map((emotion, index) => (
        <div key={index} className={`absolute ${emotion.position}`}>
          <EmotionBubble {...emotion} />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-gradient">Discover Movies</span>
          <br />
          <span className="text-[#f8fafc] opacity-90 leading-tight">Through Your 
            <span className="relative inline-block px-2">
              Lens
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#38bdf8]/30 rounded-full"></div>
            </span>
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-[#f8fafc]/80 max-w-2xl mx-auto leading-relaxed font-light">
          Let our AI analyze your facial expression and recommend the perfect movies 
          to match your current emotional state.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-[#38bdf8] text-[#0f172a] rounded-xl hover:bg-[#7dd3fc] transition-all duration-300 transform hover:scale-105 font-medium text-lg shadow-lg hover:shadow-[#38bdf8]/25"
          >
            <div className="absolute inset-0 bg-white/25 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            Get Started
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: "🎭", title: "AI-Powered", desc: "Advanced facial expression recognition" },
            { icon: "🎬", title: "Personalized", desc: "Curated movie recommendations" },
            { icon: "⚡", title: "Real-time", desc: "Instant mood detection" }
          ].map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-[#1e293b] border border-[#334155] hover:border-[#38bdf8]/30 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-[#38bdf8] mb-2 font-display">{feature.title}</h3>
              <p className="text-[#f8fafc]/80 font-light">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {showHowItWorks && <HowItWorks onClose={() => setShowHowItWorks(false)} />}
    </div>
  );
};

export default LandingHero;
