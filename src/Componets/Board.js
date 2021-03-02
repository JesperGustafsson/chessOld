import { Container, Row } from '../Styling/StyledComponents'
import Square from './Square'


export const Board = ( {board, onSelectPiece} ) => {

    return (
      <>
      {
        board.map((row, indexY) => {
          const row_html = [];
          row.map((col, indexX) => {
            //{console.log("BOARD RERENDER!!")}
            row_html.push(<Square selected = {col.selected} bgc={col.player === 1 ? "#339933" : col.player === -1 ? "#222222" : "#993333"} onSelectPiece={onSelectPiece} position = {[col.x,col.y]} graphic={`${col.graphic}${col.x},${col.y}`}></Square>)
          })
          return <Row >{row_html}</Row>
        }
        )
      }
      </>
    )
  }
  
export default Board;