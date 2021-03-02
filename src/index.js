import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
`;

ReactDOM.render(
  <React.StrictMode>
    <Container>
      <App player={1}/>
{/*       <App player={2}/>
 */}    </Container>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
