const detectionService = require("../services/detectionService");

const detectDiseaseHandler = async (request, h) => {
    try {
        const { payload } = request;
        const { file } = payload;

        if (!file) {
            console.error("No file uploaded!");
            return h.response({ status: "fail", message: "No file uploaded" }).code(400);
        }

        console.log("File received:", file.hapi);

        // Validasi tipe file
        const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
        if (!allowedTypes.includes(file.hapi.headers["content-type"])) {
            console.error("Unsupported file type:", file.hapi.headers["content-type"]);
            return h.response({ status: "fail", message: "Unsupported file type" }).code(415);
        }

        // Prediksi penyakit
        const result = await detectionService.predictDisease(file);
        return h.response({
            status: "success",
            data: {
                prediction: result.prediction,
                confidence: result.confidence,
            },
        }).code(200);
    } catch (error) {
        console.error("Error in handler:", error.message);
        return h.response({
            status: "error",
            message: "Something went wrong while detecting disease",
        }).code(500);
    }
};

module.exports = {
    detectDiseaseHandler,
};
