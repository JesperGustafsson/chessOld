import { Container } from '../Styling/StyledComponents'

export const Square = ( {color, selected, bgc, graphic, position, onSelectPiece} ) => {

    return (
      <Container color = {color} elected = {selected} bgc={bgc} onClick={(e) => {onSelectPiece(position);} } >{ graphic }</Container>
    )
  }
  
export default Square;