import Piece from './Piece'


export class Pawn extends Piece {
    constructor (player, x, y, hasNotMoved) {
      super(player, x, y);
      this.hp = 3;
      this.graphic = "♟︎"
      this.pieceType = 'Pawn'
      this.hasNotMoved = hasNotMoved;
    }


    getPossibleMoves = (board) => {
      let possibleMoves = [];
      

      //Move
      let nextX = this.x+this.direction*(1);
      let nextY = this.y;
      if (nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) {
      if (board[nextX][nextY].pieceType === "Empty") {
          possibleMoves.push([nextX,nextY]);
          if (this.hasNotMoved) {
            nextX = nextX + this.direction*(1);
            if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8)) {
              if (board[nextX][nextY].pieceType === "Empty") possibleMoves.push([nextX,nextY]);
            }
          }
        }
      }


      //Attack       
      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8)) {


      nextX = this.x+this.direction*(1);
      nextY = this.y+1;
      if (nextY >= 0 && nextY < 8) {
        if (board[nextX][nextY].pieceType !== "Empty" && board[nextX][nextY].player !== this.player) possibleMoves.push([nextX,nextY]);
      }

      nextY = this.y-1;
      if (nextY >= 0 && nextY < 8) {
        if (board[nextX][nextY].pieceType !== "Empty" && board[nextX][nextY].player !== this.player) possibleMoves.push([nextX,nextY]);
      }
    }

      this.targets = possibleMoves;


      return possibleMoves;
    }

  }