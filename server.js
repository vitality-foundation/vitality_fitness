const express = require("express");
const socketio = require("socket.io");

const config = require("./config");
const configureMiddleware = require("./middleware");
const configureRoutes = require("./routes");
const gameSocket = require("./socket/index");


// -----------------------------------------------------------------------------
// Express
// -----------------------------------------------------------------------------

const app = express();


// Config Express-Middleware
configureMiddleware(app);


// Set-up Routes
configureRoutes(app);


// -----------------------------------------------------------------------------
// Start server
// -----------------------------------------------------------------------------

const server = app.listen(config.PORT, () => {
    console.log(
        `[Server] Running on port ${config.PORT}`
    );
});


// -----------------------------------------------------------------------------
// Socket.io
// -----------------------------------------------------------------------------

const io = socketio(server);

io.on("connect", (socket) => {
    gameSocket.init(socket, io);
});


// -----------------------------------------------------------------------------
// Error handling
// -----------------------------------------------------------------------------

process.on(
    "uncaughtException",
    (err) => {

        console.error(
            "[Server] Uncaught Exception:",
            err
        );

    }
);


process.on(
    "unhandledRejection",
    (err) => {

        console.error(
            "[Server] Unhandled Rejection:",
            err
        );

    }
);
