import styled from 'styled-components'



export const Container = styled.div`
  height:40px;
  width:40px;
  background-color: ${ props => props.selected ? "#EEEEEE" : props.bgc };
  padding: 0em;
  font-size: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px #000000;
  color: ${props => props.color ? props.color : "white"}; //testing purposes
  -webkit-user-select: none; /* Safari */        
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */


`;


export const Row = styled.div`
  background-color: green;
  display: flex;
`;

export default Container;
