import './App.css';
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'

import { Empty } from './Pieces/Empty'
import { Pawn } from './Pieces/Pawn'
import { Rook } from './Pieces/Rook'
import { Knight } from './Pieces/Knight'
import { Bishop } from './Pieces/Bishop'
import { Queen } from './Pieces/Queen'
import { King } from './Pieces/King'

import CreateGameScreen from './Componets/CreateGameScreen'

import Board from './Componets/Board'
import WaitingRoom from './Componets/WaitingRoom';

const socket = io("https://limitless-shelf-54190.herokuapp.com", { autoConnect: false } );
//const socket = io("http://localhost:4001",  { autoConnect: false } );

socket.emit('test')

const RoomTitle = styled.span`
  color: #339933;
  font-weight: 900;

`;

const PlayerColor = styled.span`
  color: ${props => props.player === 1 ? 'white' : 'black'};
  color: ${props => props.player === 1 ? 'white' : 'black'};
  font-weight: 900;
  font-size: 26px;

`;

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


/*     const strLayout = [
      ["-","-","-","Q","-","-","-","K"],
      ["-","-","-","-","-","-","-","-"],
      ["-","-","-","-","-","-","-","-"],
      ["-","-","-","-","-","-","-","-"],
      ["-","-","-","-","-","-","-","-"],
      ["-","-","-","-","-","-","-","-"],
      ["-","-","-","-","-","-","Q","-"],
      ["-","k","-","-","-","-","-","-"],
        ]; */

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
  const [currentState, setCurrentState] = useState()
//  const [kingsPosition, setKingsPosition] = useState()


  const copyBoard = (board, newCurrentPlayer) => {
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
    return newBoard;
  }

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
    setBoard(newBoard);
  }

  const copyPiece = (piece) => {


    let pieceType = piece.pieceType;
    let copyPiece;
    
    switch (pieceType) {
      case ("Pawn"):      
        copyPiece = new Pawn(piece.player, piece.x, piece.y);
        break;

      case ("Rook"):
        copyPiece = new Rook(piece.player, piece.x, piece.y);
        break;

      case ("Bishop"):        
        copyPiece = new Bishop(piece.player, piece.x, piece.y);
        break;

      case ("Knight"):   
        copyPiece = new Knight(piece.player, piece.x, piece.y);
        break;

      case ("Queen"):
        copyPiece = new Queen(piece.player, piece.x, piece.y);
        break;

      case ("King"):
        copyPiece = new King(piece.player, piece.x, piece.y);
        break;

      case ("Empty"):
        copyPiece = new Empty(-1, piece.x, piece.y);
        break;
        ;

      default:
        
        break;
    }

    return copyPiece;
  }

  const checkStaleMate = (board, playerID) => {
    let originBoard = copyBoard(board);
    console.log('checkStaleMate START', originBoard)
    let mated = true;
    let tempBoard = copyBoard(originBoard)

    for (var row of originBoard) {
      for (var piece of row) {
        if (piece.player === playerID) {
     //     console.log('piece', piece)
          for (var target of piece.targets) {
            tempBoard = copyBoard(originBoard);
      //      console.log('tempBoard(before)', tempBoard)
            tempBoard[target[0]][target[1]] = copyPiece(piece);
            tempBoard[target[0]][target[1]].x = target[0];
            tempBoard[target[0]][target[1]].y = target[1];
            tempBoard[piece.x][piece.y] = new Empty (-1, piece.x, piece.y);
   //         console.log('tempBoard(after)', tempBoard)

            updateTargets(tempBoard);
            
            let checked = checkCheck(tempBoard, playerID);

            if (!checked) {
              return false;
            }
            
          }
        }
      }
    }

    console.log('checkStaleMate END', mated)


    return mated;
  }

  const checkCheck = (board, playerID) => {
    console.log("checkCheck function START", board, playerID)
    //Get the Kings Coordinates //kingsPosition not working for some reason
  //  console.log('kingsPosition', kingsPosition)

    let checked = false;

    let dummyPiece;
    let dummyPieceX;
    let dummyPieceY; 
    //let dummyPiecePlayer = playerID === 1 ? 2: 1;

    for (var row of board) {
      for (var piece of row) {
      //  console.log('piece(checkcheck)', piece)
        if (piece.pieceType === "King" && piece.player === playerID) {
          dummyPieceX = piece.x;
          dummyPieceY = piece.y;
        }
      }
    }

    //Makes dummy piece (PAWN) at kings location 
    dummyPiece = new Pawn(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    //Go through dummy pieces targets and see if there is a similar piece targetable
    for (var target of dummyPiece.targets) {
  //    console.log('target', target)
      let targetX = target[0];
      let targetY = target[1];

      if (board[targetX][targetY].pieceType === 'Pawn') {
        checked = true;
      }
    }

        //Makes dummy piece (ROOK, QUEEN) at kings location 
    dummyPiece = new Rook(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    //Go through dummy pieces targets and see if there is a similar piece targetable
    for ( target of dummyPiece.targets) {
   //   console.log('target', target)
      let targetX = target[0];
      let targetY = target[1];


      if ((board[targetX][targetY].pieceType === 'Rook' ||
           board[targetX][targetY].pieceType === 'Queen')) {
        checked = true;
      }
    }

            //Makes dummy piece (BISHOP, QUEEN) at kings location 
    dummyPiece = new Bishop(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    //Go through dummy pieces targets and see if there is a similar piece targetable
    for ( target of dummyPiece.targets) {
      let targetX = target[0];
      let targetY = target[1];
/* 
      console.log(board[targetX][targetY])
      console.log('ayy', board[targetX][targetY].pieceType === 'Bishop',
      board[targetX][targetY].pieceType === 'Queen', playerID === piece.player) */


      if ((board[targetX][targetY].pieceType === 'Bishop'
        || board[targetX][targetY].pieceType === 'Queen')) {
          console.log("I'm in boss")
        checked = true;
      }
    }

                //Makes dummy piece (KNIGHT) at kings location 
    dummyPiece = new Knight(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    //Go through dummy pieces targets and see if there is a similar piece targetable
    for ( target of dummyPiece.targets) {
      let targetX = target[0];
      let targetY = target[1];

      if (board[targetX][targetY].pieceType === 'Knight') {
        checked = true;
      }
    }


    console.log('checked', checked)
    return checked;
  }


  useEffect(() => {
    initializeBoard();
    playerID%2 === 1 ? setCurrentState("SELECTING") : setCurrentState("WAITING");


    socket.once('io emit', ({msg, newPlayerID}) => {
      setPlayerID(newPlayerID);
      newPlayerID%2 === 1 ? setCurrentState("SELECTING") : setCurrentState("WAITING");

    });
  
      //Is called when a move has been made by one of the players, updating the current player, current state and board. Also called multiple times for some reason, fix???
      socket.on('next move received', ( { newCurrentPlayer, newBoard }) => {
        makeNewBoard(newBoard, newCurrentPlayer);
        setCurrentPlayer(newCurrentPlayer);
        //check for stalemate, check and mate

        let check = checkCheck(newBoard, newCurrentPlayer)//checks if checked
        let mate = checkStaleMate(newBoard, newCurrentPlayer)


        if (check && mate) {
          setMessage('You have been mated. You lose.')
          setCurrentState("GAME OVER - LOSS");
          socket.emit('game over loss')
        } else if (mate) {
          setMessage(`You cannot move, it's a draw.`)
          setCurrentState("GAME OVER - DRAW");
          socket.emit('game over draw')
        } else if (check) {
          setMessage('You have been checked.')
          setCurrentState("SELECTING");
        } else {
          setCurrentState("SELECTING");
        }

        
      });

      socket.on('redirect waiting room', ( {player}) => {
        setGameStatus('WAITING')
        console.log('redirected to waiting room', player)
        setPlayerID(player);
        if (player === 1) {
          setCurrentState("SELECTING") 
          setMessage('Your turn!')
        } else { setCurrentState("WAITING"); 
        setMessage('Please wait for you opponent to make a move')
        }

      });

      socket.on('redirect room full', () => {
        console.log("GAME WAS FULL")
        setGameStatus('ROOM FULL')
        socket.disconnect();
      });

      socket.on('game start', () => {
        console.log('game starting!')
        setGameStatus('PLAYING')
      })

      socket.on('game over win', () => {
        setMessage('You win!')
        setCurrentState('GAME OVER - WIN')
      });

      socket.on('game over draw', () => {
        setMessage(`It's a draw!`)
        setCurrentState('GAME OVER - DRAW')
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
     //   setKingsPosition([posX, posY]);

        setSelectedPiece(newSelectedPiece);

        //Highlights targets
        highlightTargets(newSelectedPiece, true);

        setCurrentState("TARGETING")
        
      } else {
        setMessage("That's not your piece.")
      }

    } else if (currentState === "TARGETING") {

      let canMove = false;

      //highlightTargets() above sets selected to true on all possible targets
      //if selected piece has selected == true, the moving piece can target that piece
      if (newSelectedPiece.selected) canMove = true;
        //if you can move, set pieces
        if (canMove) {

           //make into a function?
          var selectedPieceType = selectedPiece.pieceType;
          var kingMove = false;

          //Moves piece
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
              console.log("king MOVED!")
              kingMove = true;
              break;
            default:
              break;
          }

          //Check if move makes you checked   - Can probably check this in a better way

            //Update the targets of all targets
          updateTargets(board);
          
          let isChecked = false;
          isChecked = checkCheck(board, currentPlayer);


          
            
          if (isChecked)  { //revert move if checked
            let oldX = selectedPiece.x;
            let oldY = selectedPiece.y;
            let newX = newSelectedPiece.x;
            let newY = newSelectedPiece.y;
            board[oldX][oldY] = selectedPiece;
            board[newX][newY] = newSelectedPiece;

            updateTargets(board);
            setCurrentState("SELECTING")
          } else {  //if move is possible, send to server which in turn sends it to the opponent
            if (kingMove) {
              console.log("KING MVOED!!!!")
      //        setKingsPosition([posX, posY]);
            }
            socket.emit("next move", { currentPlayer, board, roomName});
            setMessage('Please wait for you opponent to make a move')
            setCurrentState("WAITING");
          }
        } else {
          setCurrentState("SELECTING")
        }

          //unhighlights the targets regardless if the move was valid or not
        highlightTargets(selectedPiece, false);
      }
  }


  const handleJoinRoom = (romName, userName) => {
    setRoomName(romName);
    socket.connect();
    socket.emit('join room', romName)
  }


  const [roomName, setRoomName] = useState()
  const [gameStatus, setGameStatus] = useState('JOINING')

  return (

    <div className="App">

<header className="App-header">

        
        {gameStatus === 'JOINING' ? 
        <>
          <CreateGameScreen
          handleJoinRoom={handleJoinRoom}/>
        </>

        : gameStatus === 'WAITING' ? 
        
          <>
          <WaitingRoom 
          roomName={roomName}/>
          </>

        : gameStatus === 'ROOM FULL' ?

          <>
            Room is full!
          </>

        :

        <>
        <h2>You are in the room <RoomTitle>'{roomName}'</RoomTitle></h2>
        <p>You are playing as <PlayerColor player={playerID}>{playerID === 1 ? 'White' : 'Black'}</PlayerColor></p>

         <Board player={playerID} onSelectPiece={(position) => move(position)} board={board}/>
        <div>
          {/* <p>Current player: {currentPlayer}</p>
          <p>It is currently {currentPlayer === 1 ? 'White' : 'Black'}'s turn to move</p>
 */}          <p>{message || '--'}</p>
{/*           <p>STATUS: {currentState}</p> */}
        </div>
        </>
    }
       </header>

    </div>
  );
}

export default App;
