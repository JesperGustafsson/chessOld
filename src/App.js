import './App.css';
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import { Empty } from './Pieces/Empty'
import { Pawn } from './Pieces/Pawn'
import { Rook } from './Pieces/Rook'
import { Knight } from './Pieces/Knight'
import { Bishop } from './Pieces/Bishop'
import { Queen } from './Pieces/Queen'
import { King } from './Pieces/King'

import Board from './Componets/Board'

//const socket = io.connect("https://limitless-shelf-54190.herokuapp.com");
const socket = io("http://localhost:4000",  { autoConnect: true } );

socket.emit('test')

function App( { player } ) {

  const [board, setBoard] = useState([[]])


  const initializeBoard = () => {
    //P = Piece, O = Pawn
    const strLayout = [
     ["R","N","B","K","Q","B","N","R"],
     ["P","P","P","P","P","P","P","P"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["p","p","p","p","p","p","p","p"],
     ["r","n","b","k","q","b","n","r"]
        ];

    //Creates empty array which the board will be set as as init
    let layoutBoard = [];

    //Starting position at (0,0)
    let y = 0;
    let x = 0;

    for (var row of strLayout) {

      //Creates empty array (row) for the board
      layoutBoard.push([]);
      
      //Every col in row is a square
      for (var col of row) {

        // Starts by assuming the new square will be empty unless decided otherwise
        let player = -1;
        let newPiece = new Empty(player, x, y)

          //Checks if the square is symbolized by a letter refering to a piece
        if ("PpRrNnBbQqKk".indexOf(col) > -1) {

            //Uppcercase letter means player 1, lowercase means player 2. 
            //1 = green, 2 == red
          (col === col.toUpperCase()) ? player = 1 : player = 2;

          //What type of piece?
          if ("Pp".indexOf(col) > -1) {
            newPiece = new Pawn(player, x, y, 1)

          } else if ("Rr".indexOf(col) > -1) {
            newPiece = new Rook(player, x, y)

          } else if ("Nn".indexOf(col) > -1) {
            newPiece = new Knight(player, x, y)

          } else if ("Bb".indexOf(col) > -1) {
            newPiece = new Bishop(player, x, y)

          }else if ("Kk".indexOf(col) > -1) {
            newPiece = new King(player, x, y)
           // if (player == playerID) setKingPosition([x, y]);

          }else if ("Qq".indexOf(col) > -1) {

            newPiece = new Queen(player, x, y)

          } else {
          }
        }
        
        //Pushes the new square onto the row and ++s the x(col)-coordinate
        layoutBoard[x].push(newPiece);
        y++;
        }
        //++s the y(row) coordinate and resets the x(col)-coordinate to 0
        x++;
        y=0;
      }

    updateTargets(layoutBoard);
  
    //Sets the board
    setBoard(layoutBoard);
  }

  const updateTargets = (board) => {
    for (var row of board) {
      for (var piece of row) {
        piece.getPossibleMoves(board);
      }
    }
  }

  const [selectedPiece, setSelectedPiece] = useState();
    
  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [playerID, setPlayerID] = useState();

  const [message, setMessage] = useState();

  const [currentState, setCurrentState] = useState("yeet")

  const [roomName, setRoomName] = useState()


  const makeNewBoard = (board, newCurrentPlayer) => {
    const newBoard = [];
    let y = 0;

    for (var row of board) {
      newBoard.push([])
      for (var piece of row) {
        let newPiece = new Empty(-1, piece.x, piece.y)

        if (piece.pieceType === "Pawn") {
          newPiece = new Pawn (piece.player, piece.x, piece.y, piece.firstMove);
        } else if (piece.pieceType === "Rook") {
          newPiece = new Rook (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Bishop") {
          newPiece = new Bishop (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Knight") {
          newPiece = new Knight (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Queen") {
          newPiece = new Queen (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "King") {
          newPiece = new King (piece.player, piece.x, piece.y);
        }


        newBoard[y].push(newPiece);
        
      }
      y++;
    }

    updateTargets(newBoard);

    tryChecked(newBoard, newCurrentPlayer)
    setBoard(newBoard);
  }

  const tryCheck = (newBoard, newCurrentPlayer) => {
//    console.log("tryChevk.start", board,newBoard)
    
    for (var row of newBoard) {
      for (var piece of row) {
        piece.getPossibleMoves(newBoard);
        let dangerSquares = piece.targets;
        if (piece.player !== newCurrentPlayer && dangerSquares) {
          for (let dangerSquare of dangerSquares) {
            if (newBoard[dangerSquare[0]][dangerSquare[1]].pieceType === "King") {
              console.log("CHECK M8")
              setMessage("YOURE CHECKED AT ", dangerSquare," BY ", piece," M8")
            
              return true;
            }
          }
        }
      }
    }
    console.log("tryChevk.end")
    return false;
  }


  const tryChecked = (newBoard, newCurrentPlayer) => {

    let mated = true;
    let checked = false;

    checked = tryCheck(newBoard, newCurrentPlayer);

    for (var row of newBoard) {
      for (var piece of row) {
        if (piece.player === newCurrentPlayer) {
          for (var indx in piece.targets) {
            let move = piece.targets[indx]
            //Try one possible move
            if (move) {
              let oldPiece = newBoard[move[0]][move[1]];
              newBoard[move[0]][move[1]] = piece;
              newBoard[piece.x][piece.y] = new Empty(-1, piece.x, piece.y)
              if (!tryCheck(newBoard, newCurrentPlayer)) {
                console.log("NOT MATED!!!!", piece, " to ", move[0],move[1], newBoard)
                mated = false;
              };
              //reset move
              newBoard[move[0]][move[1]] = oldPiece;
              newBoard[piece.x][piece.y] = piece;
            }

          }
        }
      }
    }
    console.log("tryChecked.end")
    console.log('mated', mated);
    if (mated) {
      setMessage("You have been mated!")
    } else if (checked) {
      setMessage("You are checked!")
    }
    return checked;
  }

  useEffect(() => {
    initializeBoard();
    playerID%2 === 1 ? setCurrentState("SELECTING") : setCurrentState("WAITING");


    socket.once('io emit', ({msg, newPlayerID}) => {
      console.log("NEWPLAYER: ", newPlayerID)
      setPlayerID(newPlayerID);
      newPlayerID%2 === 1 ? setCurrentState("SELECTING") : setCurrentState("WAITING");

    });
  
      //Is called when a move has been made by one of the players, updating the current player, current state and board. Also called multiple times for some reason, fix???
      socket.on('new player', ( { newCurrentPlayer, newBoard }) => {
        console.log("newBoard:", newBoard)
        makeNewBoard(newBoard, newCurrentPlayer);
        setCurrentPlayer(newCurrentPlayer);
        setCurrentState("SELECTING");
      });

      socket.on('ping received', () => {
        console.log('ping received!')
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const highlightTargets = (piece, highlight) => {

    for (var coords in piece.targets) {
      const x = piece.targets[coords][0]
      const y = piece.targets[coords][1]
      board[x][y].selected = highlight;
    } 
  }

  const move = position => {

    //position refers to the x,y coordinates that the clicked square(piece) has. 
    const posX = position[0];
    const posY = position[1];
    const newSelectedPiece = board[posX][posY];

    //Checks if the client is the current player.
    if (currentState === "SELECTING") {

        //checks if players piece
      if (newSelectedPiece.player === currentPlayer) {
        setMessage("Good job! It was your turn and you selected your piece!")
        setSelectedPiece(newSelectedPiece);

        //Highlights targets
        highlightTargets(newSelectedPiece, true);


        setCurrentState("MOVING")
        
      } else {
        setMessage("That's not your piece, you dingus!")
      }

    } else if (currentState === "MOVING") {

      let canMove = false;
      if (newSelectedPiece.selected) canMove = true;
        //if you can move, set pieces
        if (canMove) {
          //Moves piece
          var selectedPieceType = selectedPiece.pieceType;


          switch (selectedPieceType) {
            case ("Pawn"):
              board[posX][posY] = new Pawn (selectedPiece.player, newSelectedPiece.x, newSelectedPiece.y, 0);
              board[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
              break;

            case ("Rook"):
              board[posX][posY] = new Rook (selectedPiece.player, newSelectedPiece.x, newSelectedPiece.y);
              board[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
              break;

            case ("Bishop"):
              board[posX][posY] = new Bishop (selectedPiece.player, newSelectedPiece.x, newSelectedPiece.y);
              board[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
              break;

            case ("Knight"):
              board[posX][posY] = new Knight (selectedPiece.player, newSelectedPiece.x, newSelectedPiece.y);
              board[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
            break;

            case ("Queen"):
              board[posX][posY] = new Queen (selectedPiece.player, newSelectedPiece.x, newSelectedPiece.y);
              board[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
              break;

            case ("King"):
              board[posX][posY] = new King (selectedPiece.player, newSelectedPiece.x, newSelectedPiece.y);
              board[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
              break;
            default:
              break;
          }

          for (var row of board) {
            for (var piece of row) {
                  piece.getPossibleMoves(board);
            }
          }
          
          let isChecked = false;
          isChecked = tryChecked(board, currentPlayer);

          //revert move if checked
          if (isChecked)  {
            let oldX = selectedPiece.x;
            let oldY = selectedPiece.y;
            let newX = newSelectedPiece.x;
            let newY = newSelectedPiece.y;
            board[oldX][oldY] = selectedPiece;
            board[newX][newY] = newSelectedPiece;
            updateTargets(board);

            setCurrentState("SELECTING")
          } else {
            socket.emit("next player", { currentPlayer, board, roomName});
            setCurrentState("WAITING");
          }
        } else {
          setCurrentState("SELECTING")
        }

                  
        highlightTargets(selectedPiece, false);
      }
  }

  const handleJoinRoom = () => {
    socket.emit('join room', roomName)
  }

  const sendPing = () => {
    socket.emit('send ping', roomName)
  }



  return (

    <div className="App">
      <header className="App-header">
        <h3>You are player {playerID}</h3>
        <p>You are in room 
          <input type="text" value={roomName} 
          onChange={e=>setRoomName(e.target.value)}/>
          <button onClick={e=> handleJoinRoom()}>Enter room!</button>
          <button onClick={e=> sendPing()}>Send ping!</button> 
        </p>
        <Board onSelectPiece={(position) => move(position)} board={board}/>
        <p>Current player: {currentPlayer}</p>
        <p>{message || '--'}</p>
        <p>STATUS: {currentState}</p>
      </header>
    </div>
  );
}

export default App;
