import React from 'react'
import Square from './Square'
import styled from 'styled-components'


const PromRow = styled.div`
display: flex;`;

const PromotionRow = ( { promote, player } ) => {
    return (
        <PromRow>
            <Square onSelectPiece={e => promote("Knight")} color = {player === 1 ? 'white' : 'black'} graphic={`♞`}></Square>
            <Square onSelectPiece={e => promote("Rook")} color = {player === 1 ? 'white' : 'black'} graphic={`♜`}></Square>
            <Square onSelectPiece={e => promote("Bishop")} color = {player === 1 ? 'white' : 'black'} graphic={`♝`}></Square>
            <Square onSelectPiece={e => promote("Queen")} color = {player === 1 ? 'white' : 'black'} graphic={`♛`}></Square>
        </PromRow>
    )
}

export default PromotionRow
