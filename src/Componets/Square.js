import { Container, Row } from '../Styling/StyledComponents'

export const Square = ( {selected, bgc, graphic, position, onSelectPiece} ) => {

    return (
      <Container selected = {selected} bgc={bgc} onClick={(e) => {/* console.log("Square.onClick!");  */onSelectPiece(position);} } >{ graphic }</Container>
    )
  }
  
export default Square;