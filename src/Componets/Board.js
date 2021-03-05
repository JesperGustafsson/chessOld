import { Row } from '../Styling/StyledComponents'
import Square from './Square'
import styled from 'styled-components'

const Container = styled.div`
  border: solid 2px;
  border-color: black;
  display: flex;
  flex-direction: ${props => props.player === 1 ? 'column-reverse' : 'column' };
  box-shadow: .25em .25em .5em .125em black;
`;
  
  export const Board = ( {player, board, onSelectPiece} ) => {

    return (
      <>
      <Container player={player}>
      {
        board.map((row, indexY) => {
         return (<Row>
           {
          row.map((col, indexX) => {
            //{console.log("BOARD RERENDER!!")}
            return (<Square color = {col.player === 1 ? 'white' : 'black' } selected = {col.selected} bgc={(col.x%2===1 && col.y%2===0) || (col.x%2===0 && col.y%2===1) ? 'rgba(190, 35, 35, 1)' : 'rgba(80, 10, 10, 1)'} onSelectPiece={onSelectPiece} position = {[col.x,col.y]} graphic={`${col.graphic}`}></Square>)
          })
            }
          </Row>)
          })
      }
      </Container>
      </>
    )
  }

export default Board;