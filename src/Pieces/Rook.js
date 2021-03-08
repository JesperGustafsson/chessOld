
import Piece from './Piece'

export class Rook extends Piece {
    constructor (player, x, y) {
      super(player, x, y);
      this.hp = 3;
      this.graphic = "♜"
      this.pieceType = 'Rook'
      this.direction = player === 1 ? 1 : -1;
      this.x = x;
      this.y = y;
     
    }

    getPossibleMoves = (board) => {

        let possibleMoves = [];

        let startX = this.x;
        let startY = this.y;



        this.moveUp(startX, startY, board, possibleMoves);

        this.moveRight(startX, startY, board, possibleMoves);

        this.moveLeft(startX, startY, board, possibleMoves);

        this.moveDown(startX, startY, board, possibleMoves);

        this.targets = possibleMoves;

        return possibleMoves;

        
    }

    moveUp = (startX, startY, board, possibleMoves) => {
        let newX = startX+1;
        if (newX && newX > 7) return;
        let nextSquare = board[newX][startY];
        if (nextSquare.player === this.player) { //Is allied
            return;
        } else if (nextSquare.pieceType === "Empty") {
            this.moveUp(newX, startY, board, possibleMoves);
        }
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
        possibleMoves.push([newX, startY])
    }
}
