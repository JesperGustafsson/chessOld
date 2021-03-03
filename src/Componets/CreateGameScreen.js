import React, { useState } from 'react'
import styled from 'styled-components'


const Container = styled.div`
    background-color: #333333;
    padding: 2em;
    margin-top: 5em;
    width: 760px;
`;

const Welcome = styled.div`

`;
const Title = styled.h1`

`;
const Instructions = styled.h3`
    >p {
        font-size: 24px;
        font-weight: 300;
    }
`;
const GameInfo = styled.div`
    display: flex;
    justify-content: center;

`;
const Username = styled.input`
    border: none;
    height: 2em;
    padding: 0.25em;
    margin: 0.25em;
`;
const RoomName = styled.input`
    border:none;
    height: 2em;
    padding: 0.25em;
    margin: 0.25em;
`;

const Button = styled.button`
    background-color: #227722;
    border: none;
    height: 4em;
    width: 8em;
    font-size: 20px;
    margin-top: 1em;

`;

const CreateGameScreen = ({handleJoinRoom}) => {

    const [userName, setUserName] = useState()
    const [roomName, setRoomName] = useState()

    const handleClick = e => {
        e.preventDefault();
        console.log(userName);
        console.log(roomName)
        handleJoinRoom(roomName, userName)
    }

    return (
        <Container> 
            <Welcome> 
                <Title> 
                    Welcome to Chess!
                </Title>
                <Instructions>  
                    Enter a username and room name below and we'll either locate or create a Game with that room name for you. 
                    <p>Castling, stalemate and en passant is not implemented yet.</p>
                </Instructions>
            </Welcome>
            <GameInfo>   
               
                 <Username placeholder={`Enter your username here`} value={userName} onChange={e=>setUserName(e.target.value)}/>   
                
                <RoomName placeholder={`Enter your roomname here`} value={roomName} onChange={e=>setRoomName(e.target.value)}/>   
            </GameInfo>
            <Button onClick={e=> handleClick(e)}>Click here to join a game!</Button>
        </Container>
    )
}

export default CreateGameScreen
