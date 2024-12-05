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
        <div className="p-8">
          <div className="grid gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-6 p-6 rounded-xl bg-[#0f172a] border border-[#334155] hover:border-[#38bdf8]/30 transition-all duration-300"
              >
                {/* Step Number & Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#38bdf8] mb-2 font-display">
                    {step.title}
                  </h3>
                  <p className="text-[#f8fafc]/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for all except last step */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-4">
                    <svg className="w-6 h-6 text-[#38bdf8]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
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
