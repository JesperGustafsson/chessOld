import Piece from './Piece'


export class King extends Piece {
    constructor (player, y, x) {
      super(player, y, x);
      this.hp = 3;
      this.graphic = "♚"
      this.pieceType = 'King'
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

      this.targets = possibleMoves;
    }
  }