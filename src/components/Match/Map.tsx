import { useState } from "react";
import { styled } from "styled-components";
import { useMap } from "../../hooks/map.hook";
import { BoosterT } from "../../types/booster";
import { MatchT } from "../../types/match";
import { UserT } from "../../types/user";
import { BoosterCell, Cell, PlayerCell } from "./Cell";

const Row = styled.div<{marginleft:number,$isFirst:boolean}>`
    display:flex;
    ${({$isFirst}) => !$isFirst && `margin-top:-20px;`}
    ${({marginleft}) => `margin-left:${marginleft}px`}
`;

const Container = styled.div`
    display:flex;
    flex-direction:column;
`;

type Props = {
    onNextTurn:() => Promise<void>
}

export const Map:React.FC<Props> = ({onNextTurn}) => {
    const {MapCoords,onStep,match} = useMap();
    console.log(MapCoords)
    return  <Container>
            {match?.activePlayer?.id};
            {Object.entries(MapCoords).map((row,i) => 
            <Row $isFirst={i === 0} marginleft={i < 8 ? (7 - i)*26 : (i - 7)*26}>
                {Object.entries(row[1]).map((cell,j) => {
                    if(cell[1].type === 'cell') return <Cell onStep={() => onStep([i,j])} value={cell[1].value as number} />
                    if(cell[1].type === 'player') return <PlayerCell onStep={() => onStep([i,j])} value={cell[1].value as UserT} />
                    if(cell[1].type === 'booster') return <BoosterCell onStep={() => onStep([i,j])} value={cell[1].value as BoosterT}/>
                })}
            </Row>)}
        </Container>
}