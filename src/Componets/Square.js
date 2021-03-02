import { Container } from '../Styling/StyledComponents'

export const Square = ( {selected, bgc, graphic, position, onSelectPiece} ) => {

    return (
      <Container selected = {selected} bgc={bgc} onClick={(e) => {onSelectPiece(position);} } >{ graphic }</Container>
    )
  }
  
export default Square;