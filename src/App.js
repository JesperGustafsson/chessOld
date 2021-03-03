import Game from './Game'
import Home from './Home'
import './App.css';
import io from 'socket.io-client'
import { BrowserRouter, Link , Route} from 'react-router-dom'

const socket = io.connect("https://limitless-shelf-54190.herokuapp.com");
//const socket = io("http://localhost:4000",  { autoConnect: true } );

function App() {

  const a = 'tree'
  return (
    <Game/>
  );
}

export default App;
