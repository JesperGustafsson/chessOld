
export class Empty {
    constructor (player, x, y) {
      this.hp = 2;
      this.graphic = "";
      this.player = player;
      this.selected = false;
      this.x = x;
      this.y = y;
      this.pieceType = 'Empty'
    }
  
    setGraphic = ( newGraphic ) => {
      this.graphic = newGraphic;
    }
  
    setPos = (x, y) => {
      this.x = x;
      this.y = y;
    }
  
    getPossibleMoves = (board) => {
        
    }
  }

  export default Empty;