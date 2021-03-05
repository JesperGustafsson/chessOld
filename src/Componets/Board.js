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

    const darkSquareColor = 'rgba(80, 10, 10, 1)'
    const lightSquareColor = 'rgba(190, 35, 35, 1)'

    return (
      <>
      <Container player={player}>
      {
        board.map((row, indexY) => {
         return (<Row>
           {
          row.map((col, indexX) => {
            let squareColor = (col.x%2===1 && col.y%2===0) || (col.x%2===0 && col.y%2===1) ? lightSquareColor : darkSquareColor
            if (player === 2) squareColor = (col.x%2===1 && col.y%2===0) || (col.x%2===0 && col.y%2===1) ? darkSquareColor : lightSquareColor
            return (<Square color = {col.player === 1 ? 'white' : 'black' } selected = {col.selected} bgc={squareColor} onSelectPiece={onSelectPiece} position = {[col.x,col.y]} graphic={`${col.graphic}`}></Square>)
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