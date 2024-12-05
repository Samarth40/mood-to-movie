import * as faceapi from 'face-api.js';

export const detectMood = async (imageElement) => {
  try {
    // Increase detection accuracy with better options
    const detection = await faceapi
      .detectSingleFace(
        imageElement,
        new faceapi.TinyFaceDetectorOptions({
          inputSize: 512,
          scoreThreshold: 0.2 // Lower threshold for better detection
        })
      )
      .withFaceLandmarks()
      .withFaceExpressions();

    if (!detection) {
      throw new Error('No face detected. Please make sure your face is clearly visible and well-lit.');
    }

    const expressions = detection.expressions;
    console.log('Raw expressions:', expressions);

    // Normalize and filter expressions
    const normalizedExpressions = Object.entries(expressions)
      .map(([emotion, score]) => ({
        emotion,
        score: Math.round(score * 100) / 100
      }))
      .filter(({ score }) => score > 0.1)
      .sort((a, b) => b.score - a.score);

    console.log('Normalized expressions:', normalizedExpressions);

    if (normalizedExpressions.length === 0) {
      throw new Error('Could not detect mood clearly. Please try again with a more pronounced expression.');
    }

    // Get top 2 emotions if they're close in confidence
    const topEmotion = normalizedExpressions[0];
    const secondEmotion = normalizedExpressions[1];

    // If the second emotion is close in confidence (within 30%), consider it a mixed emotion
    if (secondEmotion && (secondEmotion.score / topEmotion.score) > 0.7) {
      console.log('Detected mixed emotion:', topEmotion.emotion, '+', secondEmotion.emotion);
      return `${topEmotion.emotion}+${secondEmotion.emotion}`;
    }

    // Return single emotion if it's clearly dominant
    if (topEmotion.score > 0.4) {
      console.log('Detected clear emotion:', topEmotion.emotion);
      return topEmotion.emotion;
    }

    throw new Error('Could not detect a clear emotion. Please try again with better lighting and a more pronounced expression.');
  } catch (error) {
    console.error('Error in mood detection:', error);
    throw error;
  }
};
