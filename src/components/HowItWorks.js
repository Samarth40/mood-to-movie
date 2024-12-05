import React from 'react';

const HowItWorks = ({ onClose }) => {
  const steps = [
    {
      icon: "📸",
      title: "Enable Camera",
      description: "Allow access to your device's camera for real-time mood detection"
    },
    {
      icon: "🎭",
      title: "Detect Mood",
      description: "Our AI analyzes your facial expression to understand your current emotion"
    },
    {
      icon: "🎬",
      title: "Get Recommendations",
      description: "Receive personalized movie suggestions that match your mood"
    }
  ];

  return (
    <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1e293b] rounded-2xl max-w-2xl w-full relative overflow-hidden border border-[#334155]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#f8fafc]/60 hover:text-[#f8fafc] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="p-8 pb-0 text-center">
          <h2 className="text-3xl font-bold text-gradient font-display mb-4">How MoodLens Works</h2>
          <p className="text-[#f8fafc]/80 text-lg max-w-xl mx-auto">
            Transform your movie-watching experience with our AI-powered mood detection
          </p>
        </div>

        {/* Steps */}
        <div className="how-it-works-container p-4 md:p-8 lg:p-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-4">How It Works</h2>
          <div className="steps grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step bg-secondary rounded-lg p-4 shadow-md"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm md:text-base">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 pt-0 text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#38bdf8] text-[#0f172a] rounded-xl hover:bg-[#7dd3fc] transition-all duration-300 font-medium"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
