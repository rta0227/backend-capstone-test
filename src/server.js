const Hapi = require("@hapi/hapi");
const routes = require("./routes/detectionRoutes");

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"], // Izinkan CORS
            },
        },
    });

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
