import Piece from './Piece'


export class PassantPawn extends Piece {
    constructor (player, x, y, passant) {
      super(player, x, y);
      this.hp = 3;
      this.graphic = ""
      this.pieceType = 'PassantPawn'
      this.passant = passant;
    }

  }