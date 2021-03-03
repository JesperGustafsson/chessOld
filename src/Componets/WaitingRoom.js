import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    background-color: #333333;
    padding: 2em;
    margin-top: 5em;
    width: 760px;

    >b {
        color: #339933;
    }
`;

const WaitingRoom = ({roomName}) => {
    return (
        <Container>
            This is the waiting room! Please wait for an opponent to join your room or ask someone to join room <b>{roomName}</b>
        </Container>
    )
}

export default WaitingRoom