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
            return (<Square selected = {col.selected} bgc={col.player === 1 ? "#339933" : col.player === -1 ? "#222222" : "#993333"} onSelectPiece={onSelectPiece} position = {[col.x,col.y]} graphic={`${col.graphic}`}></Square>)
          })
            }
          </Row>)
          })
      }
      </>
    )
  }

export default Board;