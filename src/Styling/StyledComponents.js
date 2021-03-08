import styled from 'styled-components'



export const Container = styled.div`
  height:40px;
  width:40px;
  background-color: ${ props => props.selected ? '#AAFFAA' : props.bgc };
  padding: 0em;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
  color: ${props => props.color ? props.color : "red"};
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
`;


export const Row = styled.div`
 // background-color: green;
  display: flex;
  flex-direction: ${props => props.player === 1 ? 'row' : 'row-reverse'};


    
  ::after {
  content: '${props => props.player === 1 ? props.rowIndex : ''}';
  width: 8px;
  font-size: 8px;
  margin-left: -8px;    
  margin-top: 1.75px;
  } 

  ::before {
  content: '${props => props.player === 2 ? props.rowIndex : ''}';
  font-size: 8px;
  width: 8px;
  margin-left: -8px;
  margin-top: 1.75px;
  z-index: 1;

  } 
/* 
  ::before {
  content: '${props => props.player === 2 ? props.rowIndex : ''}';
  font-size: 8px;
  //margin-left: -15px;
  right: 29px;    
  margin-top: 1.75px;
  z-index: 1;
  }  */
`;

export default Container;
