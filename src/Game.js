import './App.css';
import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import styled from 'styled-components'

import { Empty } from './Pieces/Empty'
import { Pawn } from './Pieces/Pawn'
import { PassantPawn } from './Pieces/PassantPawn'
import { Rook } from './Pieces/Rook'
import { Knight } from './Pieces/Knight'
import { Bishop } from './Pieces/Bishop'
import { Queen } from './Pieces/Queen'
import { King } from './Pieces/King'

import CreateGameScreen from './Componets/CreateGameScreen'

import Board from './Componets/Board'
import WaitingRoom from './Componets/WaitingRoom';
import PromotionRow from './Componets/PromotionRow'

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
    /* R = Rook, N = Knight, B = Bishop, Q = Queen, K = King, P = Pawn
       Uppercase = Player 1 (white), Lowercase = Player 2 (black) */ 
/*     const startingBoardLayout = [
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","K","-","P","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","k","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"]
        ]; */

    const startingBoardLayout = [
     ["R","N","B","Q","K","B","N","R"],
     ["P","P","P","P","P","P","P","P"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["-","-","-","-","-","-","-","-"],
     ["p","p","p","p","p","p","p","p"],
     ["r","n","b","q","k","b","n","r"]
        ];
    //Creates an empty array which be filled with Pieces.
    let startingBoard = [];

    //Starting position at (0,0)
    let y = 0;
    let x = 0;

    for (var row of startingBoardLayout) {

      //Creates empty array (row) for the board
      startingBoard.push([]);
      
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
                             //(player, x, y, hasMoved)
            newPiece = new Pawn(player, x, y, true)

          } else if ("Rr".indexOf(col) > -1) {
            newPiece = new Rook(player, x, y)

          } else if ("Nn".indexOf(col) > -1) {
            newPiece = new Knight(player, x, y)

          } else if ("Bb".indexOf(col) > -1) {
            newPiece = new Bishop(player, x, y)

          }else if ("Kk".indexOf(col) > -1) {
            newPiece = new King(player, x, y, true)

          }else if ("Qq".indexOf(col) > -1) {
            newPiece = new Queen(player, x, y)
          }
        }
        
        //Pushes the new square onto the row and ++s the x(col)-coordinate
        startingBoard[x].push(newPiece);
        y++;
        }
        //++s the y(row) coordinate and resets the x(col)-coordinate to 0
        x++;
        y=0;
      }

    //Updates the targets of the pieces.
    updateTargets(startingBoard);
  
    //Sets the board
    setBoard(startingBoard);
  }

  const updateTargets = (board) => {
    for (var row of board) {
      for (var piece of row) {
        piece.getPossibleMoves(board); //Breaks when I change the name of the function... 
      }
    }
  }

  const [selectedPiece, setSelectedPiece] = useState();
  const [targetPiece, setTargetPiece] = useState();
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [playerID, setPlayerID] = useState();
  const [message, setMessage] = useState();
  const [currentState, setCurrentState] = useState()

  const copyBoard = (board, newCurrentPlayer) => {
    const newBoard = [];
    let y = 0;

    for (var row of board) {
      newBoard.push([])
      for (var piece of row) {
        let newPiece = new Empty(-1, piece.x, piece.y)

        if (piece.pieceType === "Pawn") {
          newPiece = new Pawn (piece.player, piece.x, piece.y, piece.hasNotMoved);
        } else if (piece.pieceType === "Rook") {
          newPiece = new Rook (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Bishop") {
          newPiece = new Bishop (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Knight") {
          newPiece = new Knight (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Queen") {
          newPiece = new Queen (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "King") {
          newPiece = new King (piece.player, piece.x, piece.y, piece.hasNotMoved);
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
          newPiece = new Pawn (piece.player, piece.x, piece.y, piece.hasNotMoved);
        } else if (piece.pieceType === "PassantPawn") {
          if (piece.passant) {
            newPiece = new PassantPawn (piece.player, piece.x, piece.y, 0);
          } 

        } else if (piece.pieceType === "Rook") {
          newPiece = new Rook (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Bishop") {
          newPiece = new Bishop (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Knight") {
          newPiece = new Knight (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "Queen") {
          newPiece = new Queen (piece.player, piece.x, piece.y);

        } else if (piece.pieceType === "King") {
          newPiece = new King (piece.player, piece.x, piece.y, piece.hasNotMoved);
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
        copyPiece = new Pawn(piece.player, piece.x, piece.y, piece.hasNotMoved);
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
        copyPiece = new King(piece.player, piece.x, piece.y, piece.hasNotMoved);
        break;

      case ("Empty"):
        copyPiece = new Empty(-1, piece.x, piece.y);
        break;

      default:
        break;
    }

    return copyPiece;
  }

  const checkStaleMate = (board, playerID) => {
    let originBoard = copyBoard(board);
    let tempBoard = copyBoard(originBoard)

    for (var row of originBoard) {
      for (var piece of row) {
        if (piece.player === playerID) {
          for (var target of piece.targets) {

            tempBoard = copyBoard(originBoard);

            tempBoard[target[0]][target[1]] = copyPiece(piece); //
            tempBoard[target[0]][target[1]].x = target[0];
            tempBoard[target[0]][target[1]].y = target[1];
            tempBoard[piece.x][piece.y] = new Empty (-1, piece.x, piece.y);

            updateTargets(tempBoard);
            
            let checked = checkCheck(tempBoard, playerID);

            if (!checked) {
              return false;
            }
            
          }
        }
      }
    }


    /* If not able to escape from the check without getting checked, return true (checkmated) */
    return true;
  }

  const checkCheck = (board, playerID) => {

    /*  Rather than check if the King is in a pieces targets, this function creates a dummy piece with the Kings coordinates,
        and checks if a piece of the same type is within its targets.
        //NOTE: Should probably check get the targets of all types and check targets once rather than check targets for each type one after another.
    */
    let dummyPiece;
    let dummyPieceX;
    let dummyPieceY; 

    /* Get the Kings coordinates. I tried to save the kings coordinates as a usestate each time it moves, but for some reason it gives errors. 
    Instead I look through each square until I find the piece and set the dummy piece to the kings coorindates */
    for (var row of board) {
      for (var piece of row) {
        if (piece.pieceType === "King" && piece.player === playerID) {
          dummyPieceX = piece.x;
          dummyPieceY = piece.y;
          //TODO: should probably break out of these two for-loops when the king has been found...
        }
      }
    }

    //Makes dummy piece (PAWN) at kings location 
    dummyPiece = new Pawn(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    //Go through dummy pieces targets and see if there is a similar piece targetable
    for (var target of dummyPiece.targets) {
      let targetX = target[0];
      let targetY = target[1];

      if (board[targetX][targetY].pieceType === 'Pawn') {
        return true;
      }
    }

    dummyPiece = new Rook(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    for ( target of dummyPiece.targets) {
      let targetX = target[0];
      let targetY = target[1];

      if ((board[targetX][targetY].pieceType === 'Rook' ||
           board[targetX][targetY].pieceType === 'Queen')) {
        return true;      
      }
    }

    dummyPiece = new Bishop(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    for ( target of dummyPiece.targets) {
      let targetX = target[0];
      let targetY = target[1];

      if ((board[targetX][targetY].pieceType === 'Bishop'
        || board[targetX][targetY].pieceType === 'Queen')) {
        return true;      
      }
    }

    dummyPiece = new Knight(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    for ( target of dummyPiece.targets) {
      let targetX = target[0];
      let targetY = target[1];

      if (board[targetX][targetY].pieceType === 'Knight') {
        return true;
      }
    }

    dummyPiece = new King(playerID, dummyPieceX, dummyPieceY);
    dummyPiece.getPossibleMoves(board)

    for ( target of dummyPiece.targets) {
      let targetX = target[0];
      let targetY = target[1];

      if (board[targetX][targetY].pieceType === 'King') {
        return true;
      }
    }


    return false;
  }

  const movePiece = (sourcePiece, targetSquare, posX, posY) => {

    /* Creates a copy of the board to edit, rather than editing the board directly, before setting the board if it is a legal move */
    const newBoard = copyBoard(board);
    let promoting = false;
    
    switch (sourcePiece.pieceType) {
      case ("Pawn"):
        newBoard[posX][posY] = new Pawn (selectedPiece.player, targetSquare.x, targetSquare.y, 0);

        //Creating a passant pawn when moving two squares
        if (Math.abs(posX - selectedPiece.x) > 1) {
          if (selectedPiece.player === 1) newBoard[posX - 1][posY] = new PassantPawn (selectedPiece.player, targetSquare.x - 1, targetSquare.y, 1);
          else newBoard[posX + 1][posY] = new PassantPawn (selectedPiece.player, targetSquare.x + 1, targetSquare.y, 1);
        }
        newBoard[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);

        //attacking a passant pawn kills its pawn
        if (targetSquare.pieceType === "PassantPawn") {
          if (selectedPiece.player === 1) newBoard[posX - 1][posY] = new Empty (selectedPiece.player, targetSquare.x - 1, targetSquare.y);
          else newBoard[posX + 1][posY] = new Empty (selectedPiece.player, targetSquare.x + 1, targetSquare.y);
        } 

        //A Pawn is promoted at rank 0 and 7.
        if (targetSquare.x === 0 || targetSquare.x === 7) {
          console.log("PROMOTION TIME!!")
          setCurrentState("PROMOTING");

          //Sets the promoted piece to a Queen for a start, as that is probably the wanted promotion, just in case something goes wrong.
          newBoard[posX][posY] = new Queen (selectedPiece.player, targetSquare.x, targetSquare.y);
          promoting = true;

        }

        break;


      case ("Rook"):
        newBoard[posX][posY] = new Rook (selectedPiece.player, targetSquare.x, targetSquare.y);
        newBoard[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
        break;

      case ("Bishop"):
        newBoard[posX][posY] = new Bishop (selectedPiece.player, targetSquare.x, targetSquare.y);
        newBoard[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
        break;

      case ("Knight"):
        newBoard[posX][posY] = new Knight (selectedPiece.player, targetSquare.x, targetSquare.y);
        newBoard[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
      break;

      case ("Queen"):
        newBoard[posX][posY] = new Queen (selectedPiece.player, targetSquare.x, targetSquare.y);
        newBoard[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
        break;

      case ("King"):

        
        if (  //Castling
          (targetSquare.player === selectedPiece.player //Allied
          && targetSquare.pieceType === "Rook"  //Rook
          && !targetSquare.hasNotMoved) // That hasn't moved
          ||
          (targetSquare.pieceType === "Empty" //Empty square
          && Math.abs(targetSquare.y - selectedPiece.y) > 1)// Two+ squares away
          ) {
            if ((targetSquare.y - selectedPiece.y) < 0) { //Castling Queenside


              //Step 1, move one step and see if checked
              newBoard[selectedPiece.x][3] = new King (selectedPiece.player, selectedPiece.x, 3, false)
              newBoard[selectedPiece.x][4] = new Empty (-1, selectedPiece.x, 4)
              updateTargets(newBoard)
              let willBeChecked = checkCheck(newBoard, currentPlayer)
              if (willBeChecked) {
                break;
              }
              //Step 2
              newBoard[selectedPiece.x][0] = new Empty (-1, selectedPiece.x, 0)
              newBoard[selectedPiece.x][1] = new Empty (-1, selectedPiece.x, 1)
              newBoard[selectedPiece.x][2] = new King (selectedPiece.player, selectedPiece.x, 2, false)
              newBoard[selectedPiece.x][3] = new Rook (selectedPiece.player, selectedPiece.x, 3)
              newBoard[selectedPiece.x][4] = new Empty (-1, selectedPiece.x, 4)



                
            } else {  //Castling Kingsside

              //Step 1, move one step and see if checked
              newBoard[selectedPiece.x][5] = new King (selectedPiece.player, selectedPiece.x, 5, false)
              newBoard[selectedPiece.x][4] = new Empty (-1, selectedPiece.x, 4)
              updateTargets(newBoard)
              let willBeChecked = checkCheck(newBoard, currentPlayer)
              if (willBeChecked) {
                break;
              }

              //Step 2
              newBoard[selectedPiece.x][4] = new Empty (-1, selectedPiece.x, 4)
              newBoard[selectedPiece.x][5] = new Rook (selectedPiece.player, selectedPiece.x, 5)
              newBoard[selectedPiece.x][6] = new King (selectedPiece.player, selectedPiece.x, 6, false)
              newBoard[selectedPiece.x][7] = new Empty (-1, selectedPiece.x, 7)
            }

          }
        
          else { //normal move
            newBoard[posX][posY] = new King (selectedPiece.player, targetSquare.x, targetSquare.y, false);
            newBoard[selectedPiece.x][selectedPiece.y] = new Empty(-1,selectedPiece.x,selectedPiece.y);
          }

        break;
      default:
        break;
    }


    //Update the targets of all targets
    updateTargets(newBoard);
  
    //Checks if checked
    let isChecked = checkCheck(newBoard, currentPlayer);
    
      
    if (isChecked)  { //if checked, start by selecting again.
      setCurrentState("SELECTING")
      setMessage('You will be checked if you move there')
    } else if (promoting) { //if promoting, set board and set current state to 'PROMOTING', asking you to choose which type to promote to.
      setTargetPiece(targetSquare)
      setBoard(newBoard);
      setCurrentState("PROMOTING");
      setMessage('Choose your promotion')
    } else {  //if move is possible, send to server which in turn sends it to the opponent
      socket.emit("next move", { currentPlayer, newBoard, roomName});
      setBoard(newBoard);
      setMessage('Please wait for you opponent to make a move')
      setCurrentState("WAITING");
    }
  }

  useEffect(() => {
    initializeBoard();
    playerID%2 === 1 ? setCurrentState("SELECTING") : setCurrentState("WAITING");


    socket.on('redirect waiting room', ( {player}) => {
      setGameStatus('WAITING')
      setPlayerID(player);
      if (player === 1) {
        setCurrentState("SELECTING") 
        setMessage('Your turn!')
      } else { setCurrentState("WAITING"); 
      setMessage('Please wait for you opponent to make a move')
      }

    });

    socket.on('redirect room full', () => {
      setGameStatus('ROOM FULL')
      socket.disconnect();
    });
  
    socket.on('game start', () => {
      setGameStatus('PLAYING')
    })

    socket.on('next move received', ( { newCurrentPlayer, newBoard }) => {
      makeNewBoard(newBoard, newCurrentPlayer);
      setCurrentPlayer(newCurrentPlayer);
      //check for stalemate, check and mate

      let check = checkCheck(newBoard, newCurrentPlayer)//checks if checked
      let mate = checkStaleMate(newBoard, newCurrentPlayer)
      let audio;

      if (check && mate) {
        setMessage('You have been mated. You lose.')
        setCurrentState("GAME OVER - LOSS");
        socket.emit('game over loss')
        audio = document.getElementById("lose_sound"); 
        console.log('audio', audio)

        audio.play();

      } else if (mate) {
        setMessage(`You cannot move, it's a draw.`)
        setCurrentState("GAME OVER - DRAW");
        socket.emit('game over draw')
        audio = document.getElementById("draw_sound"); 
        audio.play();
      } else if (check) {
        setMessage('You have been checked.')
        setCurrentState("SELECTING");
        audio = document.getElementById("check_sound"); 
        audio.play();

      } else {
        setCurrentState("SELECTING");
        setMessage('Your turn!')
        audio = document.getElementById("move_sound"); 
        audio.play();

      }

      
    });

    socket.on('game over win', () => {
      setMessage('You win!')
      setCurrentState('GAME OVER - WIN')
      var audio = document.getElementById("win_sound"); 
      console.log('audio', audio)
      audio.play();
    });

    socket.on('game over draw', () => {
      setMessage(`It's a draw!`)
      setCurrentState('GAME OVER - DRAW')
      var audio = document.getElementById("draw_sound"); 
      audio.play();
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

        setSelectedPiece(newSelectedPiece);

        //Highlights targets
        highlightTargets(newSelectedPiece, true);
        setCurrentState("TARGETING")
        
      } else {
        setMessage("That's not your piece.")
      }

    } else if (currentState === "TARGETING") {

      let targetable = newSelectedPiece.selected ? true : false;
      if (targetable) {
        movePiece(selectedPiece, newSelectedPiece, posX, posY)

      } else {
        setMessage('Your piece cannot move there')
        setCurrentState("SELECTING")
      }

      //unhighlights the targets regardless if the move was valid or not
      highlightTargets(selectedPiece, false);
      }
  }

  const promote = ( pieceType ) => {

    switch (pieceType) {
      case 'Knight': 
        board[targetPiece.x][targetPiece.y] = new Knight (selectedPiece.player, targetPiece.x, targetPiece.y)
        break;
  
      case 'Bishop': 
        board[targetPiece.x][targetPiece.y] = new Bishop (selectedPiece.player, targetPiece.x, targetPiece.y)
        break;
  
      case 'Rook': 
        board[targetPiece.x][targetPiece.y] = new Rook (selectedPiece.player, targetPiece.x, targetPiece.y)
        break;

      case 'Queen': 
        board[targetPiece.x][targetPiece.y] = new Queen (selectedPiece.player, targetPiece.x, targetPiece.y)
        break;

      default:
        break;

    }



    let newBoard = copyBoard(board);
    setBoard(newBoard);
    socket.emit("next move", { currentPlayer, newBoard, roomName});
    setMessage('Please wait for you opponent to make a move')
    setCurrentState("WAITING");  }

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
          <h2>You are in the room <RoomTitle>{roomName}</RoomTitle></h2>
          <p>You are playing as <PlayerColor player={playerID}>{playerID === 1 ? 'White' : 'Black'}</PlayerColor></p>
          {currentState === "PROMOTING" && <PromotionRow promote={promote} player = {playerID}/>}
          <Board player={playerID} onSelectPiece={(position) => move(position)} board={board}/>
          <p>{message || '--'}</p>
        </>
    }
       </header>
    </div>
  
  );
}

export default App;