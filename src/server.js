require('dotenv').config();
const Hapi = require("@hapi/hapi");
const routes = require("./routes/detectionRoutes");
const loadModel = require('../services/loadModel');

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: "0.0.0.0",
        routes: {
            cors: {
                origin: ["*"], // Izinkan CORS
            },
        },
    });;
 
    const model = await loadModel();
    server.app.model = model;

    // Daftarkan route
    server.route(routes);

    await server.start();
    console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
    console.error(err);
    process.exit(1);
});

init();
