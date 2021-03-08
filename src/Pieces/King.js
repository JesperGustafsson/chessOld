import Piece from './Piece'
//import copyBoard from '../Game'


export class King extends Piece {
    constructor (player, y, x, hasNotMoved) {
      super(player, y, x);
      this.hp = 3;
      this.graphic = "♚"
      this.pieceType = 'King'
      this.hasNotMoved = hasNotMoved;
    }

    getPossibleMoves = (board) => {
      let possibleMoves = [];
      for (let row = this.y-1; row <= this.y+1; row++) {
        for (let col = this.x-1; col <= this.x+1; col++) {
            if (row > -1 && row < 8 && col > -1 && col < 8) {
              if (board[col][row].player !== this.player) {
                possibleMoves.push([col, row]); 

              }
          }
        }
      }
        //Castling
      if  (this.hasNotMoved && this.y === 4) {
        //Queenside
        if (board[this.x][this.y-4].pieceType === "Rook") {
          if ((board[this.x][this.y-3].pieceType === "Empty") && (board[this.x][this.y-2].pieceType === "Empty") && (board[this.x][this.y-1].pieceType === "Empty")) {
            possibleMoves.push([this.x, this.y - 2]);
            possibleMoves.push([this.x,this.y-4]);
          }
        }
        //Kingsside
        if (board[this.x][this.y+3].pieceType === "Rook") {
          if ((board[this.x][this.y+2].pieceType === "Empty") && (board[this.x][this.y+1].pieceType === "Empty")) {
            possibleMoves.push([this.x, this.y + 2]);
            possibleMoves.push([this.x,this.y+3]);
          }
        }

      }

      //Castling
      //Check if selected square is (1,3? || 1, 6)(White) or (8,3 || 8,6)(Black)
        //Check if King unmoved
          //Check if squares between empty
            //New newboard at each move towards castling piece
              //Check if checked
                //Move both rook and king

      this.targets = possibleMoves;
    }
  }