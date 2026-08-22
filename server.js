const path = require("path");
const fs = require("fs");

const express = require("express");
const socketio = require("socket.io");

const git = require("isomorphic-git");
const http = require("isomorphic-git/http/node");

const config = require("./config");
const configureMiddleware = require("./middleware");
const configureRoutes = require("./routes");
const gameSocket = require("./socket/index");


// -----------------------------------------------------------------------------
// Git updater configuration
// -----------------------------------------------------------------------------

const PROJECT_DIR = __dirname;

const GIT_BRANCH = "main";
const GIT_REMOTE = "origin";

// 100 seconds
const UPDATE_INTERVAL = 10 * 1000;

let updateInProgress = false;


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
// Git updater
// -----------------------------------------------------------------------------

async function checkForUpdates() {

    // Prevent two update checks from running simultaneously
    if (updateInProgress) {
        return;
    }

    updateInProgress = true;

    try {

        console.log(
            "[Updater] Checking origin/main..."
        );


        // ---------------------------------------------------------------------
        // Make sure current branch is main
        // ---------------------------------------------------------------------

        const currentBranch = await git.currentBranch({
            fs,
            dir: PROJECT_DIR,
            fullname: false
        });


        if (currentBranch !== GIT_BRANCH) {

            console.log(
                `[Updater] Current branch is "${currentBranch}".`
            );

            console.log(
                `[Updater] Expected "${GIT_BRANCH}". Skipping update.`
            );

            return;
        }


        // ---------------------------------------------------------------------
        // Get current local commit
        // ---------------------------------------------------------------------

        const localCommit = await git.resolveRef({
            fs,
            dir: PROJECT_DIR,
            ref: "HEAD"
        });


        console.log(
            "[Updater] Local commit:",
            localCommit
        );


        // ---------------------------------------------------------------------
        // Fetch latest main branch
        // ---------------------------------------------------------------------

        const fetchResult = await git.fetch({

            fs,
            http,

            dir: PROJECT_DIR,

            remote: GIT_REMOTE,

            ref: GIT_BRANCH,

            singleBranch: true,

            tags: false
        });


        const remoteCommit = fetchResult.fetchHead;


        if (!remoteCommit) {

            console.log(
                "[Updater] Could not determine remote commit."
            );

            return;
        }


        console.log(
            "[Updater] Remote commit:",
            remoteCommit
        );


        // ---------------------------------------------------------------------
        // Already latest
        // ---------------------------------------------------------------------

        if (localCommit === remoteCommit) {

            console.log(
                "[Updater] Already up to date."
            );

            return;
        }


        console.log(
            "[Updater] New commit detected."
        );


        // ---------------------------------------------------------------------
        // Pull latest main
        //
        // fastForwardOnly means:
        //
        // local:
        //    A --- B
        //
        // remote:
        //    A --- B --- C
        //
        // becomes:
        //
        //    A --- B --- C
        //
        // but it will NOT automatically create a complicated merge commit.
        // ---------------------------------------------------------------------

        await git.pull({

            fs,
            http,

            dir: PROJECT_DIR,

            remote: GIT_REMOTE,

            ref: GIT_BRANCH,

            remoteRef: GIT_BRANCH,

            singleBranch: true,

            fastForwardOnly: true,

            author: {
                name: "Auto Updater",
                email: "updater@localhost"
            }
        });


        // ---------------------------------------------------------------------
        // Verify new HEAD
        // ---------------------------------------------------------------------

        const newCommit = await git.resolveRef({

            fs,
            dir: PROJECT_DIR,

            ref: "HEAD"
        });


        console.log(
            "----------------------------------------"
        );

        console.log(
            "[Updater] PROJECT UPDATED"
        );

        console.log(
            "[Updater] Old:",
            localCommit
        );

        console.log(
            "[Updater] New:",
            newCommit
        );

        console.log(
            "----------------------------------------"
        );


    } catch (error) {

        console.error(
            "[Updater] Update error:",
            error.message
        );

    } finally {

        updateInProgress = false;
    }
}


// -----------------------------------------------------------------------------
// Check once shortly after startup
// -----------------------------------------------------------------------------

setTimeout(() => {

    checkForUpdates();

}, 3000);


// -----------------------------------------------------------------------------
// Check every 100 seconds
// -----------------------------------------------------------------------------

setInterval(() => {

    checkForUpdates();

}, UPDATE_INTERVAL);


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