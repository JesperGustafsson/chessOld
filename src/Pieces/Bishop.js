import Piece from './Piece'

export class Bishop extends Piece {
    constructor (player, y, x) {
      super(player, y, x);
      this.hp = 3;
      this.graphic = "♝"
      this.pieceType = 'Bishop'
    }
    getPossibleMoves = (board) => {
      let possibleMoves = [];

      let nextX = this.x;
      let nextY = this.y;

      this.moveUpLeft(nextX, nextY, board, possibleMoves)
      this.moveUpRight(nextX, nextY, board, possibleMoves)
      this.moveDownRight(nextX, nextY, board, possibleMoves)
      this.moveDownLeft(nextX, nextY, board, possibleMoves)

      this.targets = possibleMoves;

    }
    moveUpLeft(nextX,nextY,board,possibleMoves) {
      nextX = nextX-1;
      nextY = nextY-1;

      if (nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) {

      let nextSquare = board[nextX][nextY];
      if (nextSquare.player === this.player) {//Is allied
        return;
      } else if (nextSquare.pieceType === "Empty") {
        this.moveUpLeft(nextX, nextY, board, possibleMoves);
      }
      possibleMoves.push([nextX,nextY])
    }
    }
    moveUpRight(nextX,nextY,board,possibleMoves) {
      nextX = nextX-1;
      nextY = nextY+1;
      if (nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) {

        let nextSquare = board[nextX][nextY];
        if (nextSquare.player === this.player) {//Is allied
          return;
        } else if (nextSquare.pieceType === "Empty") {
          this.moveUpRight(nextX, nextY, board, possibleMoves);
        }
        possibleMoves.push([nextX,nextY])
      }
    }
    moveDownRight(nextX,nextY,board,possibleMoves) {
      nextX = nextX+1;
      nextY = nextY+1;
      if (nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) {

        let nextSquare = board[nextX][nextY];
        if (nextSquare.player === this.player) {//Is allied
          return;
        } else if (nextSquare.pieceType === "Empty") {
          this.moveDownRight(nextX, nextY, board, possibleMoves);
        }
        possibleMoves.push([nextX,nextY])
      }
    }   
    moveDownLeft(nextX,nextY,board,possibleMoves) {
      nextX = nextX+1;
      nextY = nextY-1;
      if (nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) {

        let nextSquare = board[nextX][nextY];
        if (nextSquare.player === this.player) {//Is allied
          return;
        } else if (nextSquare.pieceType === "Empty") {
          this.moveDownLeft(nextX, nextY, board, possibleMoves);
        }
        possibleMoves.push([nextX,nextY])
      }
    }

  }