const { detectDiseaseHandler } = require("../handlers/detectionHandler");

const detectionRoutes = [
    {
        method: "POST",
        path: "/detect",
        config: {
            payload: {
                output: "stream", // Gunakan stream untuk file
                parse: true,
                multipart: true, // Pastikan mendukung multipart
                allow: "multipart/form-data", // Izinkan multipart/form-data
                maxBytes: 5 * 1024 * 1024, // Maksimum ukuran file (5MB)
            },
        },
        handler: detectDiseaseHandler,
    },
];

module.exports = detectionRoutes;
