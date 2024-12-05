const fs = require('fs');
const https = require('https');
const path = require('path');

const modelsDir = path.join(__dirname, 'public', 'models');

// Create models directory if it doesn't exist
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
}

const modelFiles = [
  'tiny_face_detector_model-shard1',
  'tiny_face_detector_model-weights_manifest.json',
  'face_expression_model-shard1',
  'face_expression_model-weights_manifest.json',
  'face_landmark_68_model-shard1',
  'face_landmark_68_model-weights_manifest.json',
  'face_recognition_model-shard1',
  'face_recognition_model-shard2',
  'face_recognition_model-weights_manifest.json'
];

const baseUrl = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

async function downloadFile(filename) {
  const destination = path.join(modelsDir, filename);
  const file = fs.createWriteStream(destination);

  return new Promise((resolve, reject) => {
    https.get(`${baseUrl}/${filename}`, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(destination, () => {});
      reject(err);
    });
  });
}

async function downloadAll() {
  for (const file of modelFiles) {
    try {
      await downloadFile(file);
    } catch (error) {
      console.error(`Error downloading ${file}:`, error);
    }
  }
}

downloadAll();
