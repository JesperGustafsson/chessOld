import Piece from './Piece'


export class Queen extends Piece {
    constructor (player, y, x) {
      super(player, y, x);
      this.hp = 3;
      this.graphic = "♛"
      this.pieceType = 'Queen'
    }

    getPossibleMoves = (board) => {
      let possibleMoves = [];

      let nextX = this.x;
      let nextY = this.y;

      this.moveUpLeft(nextX, nextY, board, possibleMoves)
      this.moveUpRight(nextX, nextY, board, possibleMoves)
      this.moveDownRight(nextX, nextY, board, possibleMoves)
      this.moveDownLeft(nextX, nextY, board, possibleMoves)
      this.moveUp(nextX, nextY, board, possibleMoves);

      this.moveRight(nextX, nextY, board, possibleMoves);

      this.moveLeft(nextX, nextY, board, possibleMoves);

      this.moveDown(nextX, nextY, board, possibleMoves);

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

    moveUp = (startX, startY, board, possibleMoves) => {
      let newX = startX+1;
      if (newX > 7) return;
      let nextSquare = board[newX][startY];
      if (nextSquare.player === this.player) { //Is allied
          return;
      } else if (nextSquare.pieceType === "Empty") {
          this.moveUp(newX, startY, board, possibleMoves);
      }
  //    board[newX][startY].selected = true;
      possibleMoves.push([newX, startY])


    }

    moveRight = (startX, startY, board, possibleMoves) => {
        let newY = startY+1;
        let nextSquare = board[startX][newY];
        if (!nextSquare || nextSquare.player === this.player) { //Is allied
            return;
        } else if (nextSquare.pieceType === "Empty") {
            this.moveRight(startX, newY, board, possibleMoves);
        }
    //     board[startX][newY].selected = true;
        possibleMoves.push([startX, newY])


    }

    moveLeft = (startX, startY, board, possibleMoves) => {
        let newY = startY-1;
        let nextSquare = board[startX][newY];
        if (!nextSquare || nextSquare.player === this.player) { //Is allied
            return;
        } else if (nextSquare.pieceType === "Empty") {
            this.moveLeft(startX, newY, board, possibleMoves);
        }
    //    board[startX][newY].selected = true;
        possibleMoves.push([startX, newY])
    }

    moveDown = (startX, startY, board, possibleMoves) => {
        let newX = startX-1;
        if (newX < 0) return;
        let nextSquare = board[newX][startY];
        if (nextSquare.player === this.player) { //Is allied
            return;
        } else if (nextSquare.pieceType === "Empty") {
            this.moveDown(newX, startY, board, possibleMoves);
        }
    //    board[newX][startY].selected = true;
        possibleMoves.push([newX, startY])
    }
  }