import styled from 'styled-components'



export const Container = styled.div`
  height:40px;
  width:40px;
  background-color: ${ props => props.selected ? "#555555" : props.bgc };
  padding: 0em;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #000000;
  color: ${props => props.selected ? "black" : "white"}; //testing purposes

`;


export const Row = styled.div`
  background-color: green;
  display: flex;
`;

export default Container;
