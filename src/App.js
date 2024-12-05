import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import Webcam from 'react-webcam';
import { fetchMoviesByMood } from './utils/movieApi';
import MovieCard from './components/MovieCard';
import Navbar from './components/Navbar';
import HowItWorks from './components/HowItWorks';
import LandingHero from './components/LandingHero';
import './styles/animations.css';

function App() {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [detectedMood, setDetectedMood] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 640, height: 480 });
  
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
      ]);
      setIsModelLoading(false);
    } catch (error) {
      setError('Failed to load AI models. Please refresh the page.');
      console.error('Error loading models:', error);
    }
  };

  const handleVideoLoad = (videoNode) => {
    if (videoNode) {
      const { videoWidth, videoHeight } = videoNode;
      setDimensions({ width: videoWidth, height: videoHeight });
      
      // Set canvas dimensions
      if (canvasRef.current) {
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;
      }
    }
  };

  const startCamera = () => {
    setIsCameraActive(true);
    setError(null);
    setMovies([]);
    setDetectedMood(null);
  };

  const stopCamera = () => {
    setIsCameraActive(false);
  };

  const captureExpression = async () => {
    if (!webcamRef.current?.video || !canvasRef.current) return;

    try {
      setIsCapturing(true);
      setError(null);

      const video = webcamRef.current.video;
      const canvas = canvasRef.current;

      // Ensure dimensions are set
      if (video.readyState === 4) {
        const { videoWidth, videoHeight } = video;
        const displaySize = { width: videoWidth, height: videoHeight };
        
        // Set canvas size to match video
        canvas.width = displaySize.width;
        canvas.height = displaySize.height;
        
        // Match dimensions
        faceapi.matchDimensions(canvas, displaySize);

        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 512 }))
          .withFaceExpressions();

        if (!detections || detections.length === 0) {
          throw new Error('No face detected. Please ensure your face is clearly visible.');
        }

        // Clear previous drawings
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the detections
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        // Get the dominant expression
        const expressions = detections[0].expressions;
        const mood = Object.entries(expressions).reduce((a, b) => 
          expressions[a] > expressions[b[0]] ? a : b[0]
        );

        setDetectedMood(mood);

        // Fetch movie recommendations
        const recommendedMovies = await fetchMoviesByMood(mood);
        setMovies(recommendedMovies);
        stopCamera();
      }
    } catch (error) {
      console.error('Capture error:', error);
      setError(error.message || 'Failed to capture expression. Please try again.');
    } finally {
      setIsCapturing(false);
    }
  };

  const retryCapture = () => {
    setMovies([]);
    setDetectedMood(null);
    setError(null);
    startCamera();
  };

  if (isModelLoading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#38bdf8] mx-auto mb-4"></div>
          <p className="text-[#38bdf8]/60">Loading AI Models...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] pb-20 md:pb-0">
      <Navbar onHowItWorks={() => setShowHowItWorks(true)} />
      
      {showHowItWorks && <HowItWorks onClose={() => setShowHowItWorks(false)} />}

      <main className="relative">
        {!isCameraActive && movies.length === 0 ? (
          <LandingHero onStart={startCamera} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
            {isCameraActive ? (
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative rounded-2xl overflow-hidden bg-[#1e293b] border-2 border-[#334155]">
                  <Webcam
                    ref={webcamRef}
                    mirrored
                    screenshotFormat="image/jpeg"
                    className="w-full"
                    videoConstraints={{
                      width: dimensions.width,
                      height: dimensions.height,
                      facingMode: "user"
                    }}
                    onLoadedMetadata={() => handleVideoLoad(webcamRef.current?.video)}
                  />
                  <canvas 
                    ref={canvasRef}
                    className="absolute top-0 left-0 w-full h-full"
                    style={{
                      width: dimensions.width,
                      height: dimensions.height
                    }}
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#0f172a]/90">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={stopCamera}
                        className="px-4 py-2 bg-[#1e293b] text-[#38bdf8] rounded-lg hover:bg-[#334155] transition-colors duration-150"
                        disabled={isCapturing}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={captureExpression}
                        disabled={isCapturing}
                        className="px-6 py-2 bg-[#38bdf8] text-[#0f172a] rounded-lg hover:bg-[#7dd3fc] transition-colors duration-150 flex items-center gap-2 font-medium"
                      >
                        {isCapturing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#0f172a]/60 border-t-[#0f172a]"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>Capture Mood</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-900/20 border border-red-800/50 rounded-xl text-red-300 text-center">
                    {error}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center mb-12">
                <div className="space-y-4">
                  <div className="inline-block px-6 py-3 bg-[#1e293b] rounded-xl border border-[#334155]">
                    <span className="text-[#f8fafc]">Detected Mood: </span>
                    <span className="font-semibold text-[#f472b6] capitalize">{detectedMood}</span>
                  </div>
                  <div>
                    <button
                      onClick={retryCapture}
                      className="px-6 py-3 bg-[#1e293b] text-[#38bdf8] rounded-xl hover:bg-[#334155] transition-colors duration-150"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {movies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-center text-[#38bdf8]">
                  Recommended Movies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-[#334155] bg-[#1e293b] mt-8 md:mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center">
            <h3 className="text-2xl font-bold text-[#38bdf8] font-display">Privacy First</h3>
            <div className="space-y-2 text-[#f8fafc]/80 max-w-3xl mx-auto">
              <p className="leading-relaxed">
                <span className="text-[#f472b6]">✨ 100% Frontend Project:</span> All processing happens directly in your browser. No server, no data storage.
              </p>
              <p className="leading-relaxed">
                <span className="text-[#f472b6]">🔒 Camera Privacy:</span> Photos taken are only used for mood analysis and are immediately deleted. We never store or transmit your images.
              </p>
              <p className="leading-relaxed">
                <span className="text-[#f472b6]">⚡ Real-time Processing:</span> Your expressions are analyzed instantly and locally on your device.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
