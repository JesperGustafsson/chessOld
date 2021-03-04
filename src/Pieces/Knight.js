import Piece from './Piece'


export class Knight extends Piece {
    constructor (player, y, x) {
      super(player, y, x);
      this.hp = 3;
      this.graphic = "♞"
      this.pieceType = 'Knight'
    }

    getPossibleMoves = (board) => {
      let possibleMoves = [];
      let nextX = this.x;
      let nextY = this.y;

      //Upleft

      nextY = nextY-1;
      nextX = nextX-2;

      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) && (board[nextX][nextY].player !== this.player))  possibleMoves.push([nextX, nextY]) 


       //UpRight
      nextY = this.y+1;
      nextX = this.x-2;

      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) && (board[nextX][nextY].player !== this.player))  possibleMoves.push([nextX, nextY])

            //RightUp
      nextY = this.y+2;
      nextX = this.x-1;

      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) && (board[nextX][nextY].player !== this.player))  possibleMoves.push([nextX, nextY])

      //RightDown
      nextY = this.y+2;
      nextX = this.x+1;

      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) && (board[nextX][nextY].player !== this.player))  possibleMoves.push([nextX, nextY])

      //DownRight
      nextY = this.y+1;
      nextX = this.x+2;

      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) && (board[nextX][nextY].player !== this.player))  possibleMoves.push([nextX, nextY])

      //DownLeft
      nextY = this.y-1;
      nextX = this.x+2;

      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) && (board[nextX][nextY].player !== this.player))  possibleMoves.push([nextX, nextY])

      
      //LeftDown
      nextY = this.y-2;
      nextX = this.x+1;
      
      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) && (board[nextX][nextY].player !== this.player))  possibleMoves.push([nextX, nextY])

      //LeftUp
      nextY = this.y-2;
      nextX = this.x-1;

      if ((nextX > -1 && nextX < 8 && nextY > -1 && nextY < 8) && (board[nextX][nextY].player !== this.player))  possibleMoves.push([nextX, nextY])

      this.targets = possibleMoves;

     // console.log('board', board) 
     // console.log('this.targets', this, this.targets)
    }
  }