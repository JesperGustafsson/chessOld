const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000", //needed so that port ;3000 can connect to the server at ;4000
    },
});

var playerID = 1;

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function(socket) {
    console.log(`a user ${playerID} connected`);
    socket.emit("io emit", { msg:`Welcome, player ${playerID}!`, newPlayerID:playerID });
   // playerID=playerID*-1;
    playerID++;
    socket.on("socket emit", () => {
        io.emit("io emit-two", "The server noticed that you clicked something!");
    });

    socket.on('disconnect', () => {
      console.log("someone disconnected.")
      playerID=playerID-1;
    });



    //Sets currentPlayer to next
    socket.on('next player', ({ currentPlayer, board }) => {

      console.log("next player!1", currentPlayer);
      currentPlayer == 1 ? currentPlayer = 2 : currentPlayer = 1;
      console.log("next player!2", currentPlayer);
     // console.log(board);
      socket.broadcast.emit('new player', { newCurrentPlayer: currentPlayer, newBoard: board })
    });
});




http.listen(4000, () => {
  console.log('listening on *:4000');
});