
export class Piece {
    constructor (player, x, y) {
      this.hp = 2;
      this.graphic = "♔";
      this.player = player;
      this.selected = false;
      this.x = x;
      this.y = y;
      this.pieceType = 'Piece'
      this.direction = player === 1 ? 1 : -1;
      this.targeted = false;
      this.targets = [];

    }
  
    setPos = (x, y) => {
      this.x = x;
      this.y = y;
    }

    setGraphic = ( newGraphic ) => {
      this.graphic = newGraphic;
    }

    getPossibleMoves = (board) => {

    }

  }
  
 
  

  


  
  
  

  export default Piece;