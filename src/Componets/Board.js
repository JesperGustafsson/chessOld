import { Row } from '../Styling/StyledComponents'
import Square from './Square'
import styled from 'styled-components'

const Container = styled.div`
 // border: solid 2px;
//  border-color: black;
//  display: flex;
//  flex-direction: ${props => props.player === 1 ? 'column-reverse' : 'column' };
  //justify-content: center;
  //align-items: center;

/*   ::after {

    content: 'A B C D E F G H';
    letter-spacing: 13px;
    font-size: 20px;
    height: 25px;
  } */
`;

const BoardContainer = styled.div`
  box-shadow: .25em .25em .5em .125em black;

 // border: solid 2px;
  border-color: black;
  display: flex;
  flex-direction: ${props => props.player === 1 ? 'column-reverse' : 'column' };

/*   ::after {

    content: 'A B C D E F G H';
    letter-spacing: 13px;
    font-size: 20px;
    height: 25px;
  } */
`;

const HorizontalAxis = styled.div`
  position: relative;
display: flex;
width: 100%;
right: 15.5px;
//margin-left: ${props => props.player === 1 ? '-21.5px' : '-44px'};
//border: solid 1px black;
flex-direction: ${props => props.player === 1 ? 'row' : 'row-reverse'};
-moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */



`;
const HorizontalAxisSquare = styled.div`
  font-size: 8px;
  margin-top: -12px;
  //height: 20px;
  width: 40px;
  border: solid 1px transparent;


`;

  
  export const Board = ( {player, board, onSelectPiece} ) => {

    const darkSquareColor = 'rgba(130, 20, 20, 0.9)'
    const lightSquareColor = 'rgba(200, 35, 35, 1)'

    return (
      <>
      

      <Container player={player}>
        <BoardContainer player={player}> 
      {
        board.map((row, indexY) => {
         return (<><Row player ={player} rowIndex = {`${indexY+1}`}>
           {
          row.map((col, indexX) => {
            let squareColor = (col.x%2===1 && col.y%2===0) || (col.x%2===0 && col.y%2===1) ? lightSquareColor : darkSquareColor
           // if (player === 2) squareColor = (col.x%2===1 && col.y%2===0) || (col.x%2===0 && col.y%2===1) ? darkSquareColor : lightSquareColor
            return (<Square color = {col.player === 1 ? 'white' : 'black' } selected = {col.selected} bgc={squareColor} onSelectPiece={onSelectPiece} position = {[col.x,col.y]} graphic={`${col.graphic}`}></Square>)
          })
            }
          </Row>
          </>)
          })
      }
      </BoardContainer>
      <HorizontalAxis player = {player}>
          <HorizontalAxisSquare>A</HorizontalAxisSquare>
          <HorizontalAxisSquare>B</HorizontalAxisSquare>
          <HorizontalAxisSquare>C</HorizontalAxisSquare>
          <HorizontalAxisSquare>D</HorizontalAxisSquare>
          <HorizontalAxisSquare>E</HorizontalAxisSquare>
          <HorizontalAxisSquare>F</HorizontalAxisSquare>
          <HorizontalAxisSquare>G</HorizontalAxisSquare>
          <HorizontalAxisSquare>H</HorizontalAxisSquare>
        </HorizontalAxis>
      </Container>

      </>
    )
  }

export default Board;