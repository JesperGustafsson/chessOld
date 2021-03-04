import { Row } from '../Styling/StyledComponents'
import Square from './Square'


  
  export const Board = ( {board, onSelectPiece} ) => {

    return (
      <>
      {
        board.map((row, indexY) => {
         return (<Row>
           {
          row.map((col, indexX) => {
            //{console.log("BOARD RERENDER!!")}
            return (<Square color = {col.player === 1 ? 'white' : 'black' } selected = {col.selected} bgc={(col.x%2===1 && col.y%2===0) || (col.x%2===0 && col.y%2===1) ? '#88BB55' : '#BB5555'} onSelectPiece={onSelectPiece} position = {[col.x,col.y]} graphic={`${col.graphic}`}></Square>)
          })
            }
          </Row>)
          })
      }
      </>
    )
  }

export default Board;