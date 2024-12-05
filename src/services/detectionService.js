const tf = require("@tensorflow/tfjs-node");
const path = require("path");

const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel(process.env.MODEL_URL);
    console.log("Model loaded successfully.");
  }
  return model;
};

const predictDisease = async (file) => {
  try {
    const model = await loadModel();
    const buffer = await file.read();

    if (!buffer) throw new Error("Failed to read file buffer");

    const imageTensor = tf.node
      .decodeImage(buffer, 3)
      .resizeBilinear([150, 150])
      .div(255.0)
      .expandDims(0);

    console.log("Model input shape:", model.inputs[0].shape);
    console.log("Image tensor shape:", imageTensor.shape);

    if (imageTensor.shape.slice(1).join(",") !== model.inputs[0].shape.slice(1).join(",")) {
      throw new Error("Input tensor shape does not match model input shape");
    }

    const prediction = model.predict(imageTensor);
    const scores = prediction.dataSync();

    const maxIndex = scores.indexOf(Math.max(...scores));
    const labels = ["Healthy", "Bacterial Spot", "Early Blight", "Late Blight", "Leaf Mold"];

    return {
      prediction: labels[maxIndex],
      confidence: Math.max(...scores).toFixed(2),
    };
  } catch (error) {
    console.error("Error during prediction:", error.message);
    throw error;
  }
};

module.exports = { predictDisease };
