const app = require('express')()
const server = require('http').createServer(app)

const io = require('socket.io')(server)

const next = require("next");
const dev = process.env.NODE_ENV != 'production';
const nextApp = next({ dev });

const nextHandler = nextApp.getRequestHandler()

const PORT = 3000 || process.env.PORT;

// Run when client connnects
io.on("connect", socket => {
    console.log("New Connection!")
    socket.emit("now", {
        message: "Hello"
    })
    
});

// custom nextJs server
nextApp.prepare().then(() => {
    app.get("*", (req, res) => {
        return nextHandler(req, res);
    });

    server.listen(PORT, (err) => {
        if(err) {
            console.log("Something went wrong");
            console.log(err);
        }
        console.log(`Ready on port http://localhost:${PORT}`);
    })
})
