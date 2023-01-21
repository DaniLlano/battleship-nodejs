const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => console.log(`server running on ${PORT}`));

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));

// handle socket connection requests from client

const connections = [null, null]
io.on('connection', socket => {
    console.log(`new socket connection`)

    let playerIndex = -1;
    for (const i in connections) {
        if (connections[i] === null) {
            playerIndex = 0;
            break;
        }
    }
    
    // tell the connection client what player they are
    socket.emit('player-number', playerIndex);
    
    console.log(`Player ${playerIndex} has connected`);
    
    if (playerIndex === -1) return;
    // ignore player 3
})