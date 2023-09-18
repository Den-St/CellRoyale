import { styled } from "styled-components";
import { Display } from "../../assets/Display";
import { useMap } from "../../hooks/map.hook";
import { BoosterT } from "../../types/booster";
import { UserT } from "../../types/user";
import { MatchResultModal } from "../MatchResultModal";
import { BoosterCell, Cell, PlayerCell } from "./Cell";

const Row = styled.div<{marginleft:number,$isFirst:boolean}>`
    display:flex;
    ${({$isFirst}) => !$isFirst && `margin-top:-20px;`}
    ${({marginleft}) => `margin-left:${marginleft}px`}
`;

const ActivePlayerCell = styled.span<{color?:string}>`
    font-size:50px;
    ${({color}) => `color:${color}`};
`;

export const Map = () => {
    const {MapCoords,onStep,match,isEliminated,isWinner} = useMap();

    return  <Display>
            <MatchResultModal open={isWinner || isEliminated}/>
            <Display style={{flexDirection:"column"}}>
                {Object.entries(MapCoords).map((row,i) => 
                <Row $isFirst={i === 0} marginleft={i < 8 ? (7 - i)*26 : (i - 7)*26} >
                    {Object.entries(row[1]).map((cell,j) => {
                        if(cell[1].type === 'cell') return <Cell  onStep={() => onStep([i,j])} value={cell[1].value as number} />
                        if(cell[1].type === 'player') return <PlayerCell  onStep={() => onStep([i,j])} value={cell[1].value as UserT} />
                        if(cell[1].type === 'booster') return <BoosterCell  onStep={() => onStep([i,j])} value={cell[1].value as BoosterT}/>
                    })}
                </Row>)}
            </Display>
            {match?.activePlayer?.color && 
                <Display style={{alignContent:'center'}}>
                    <ActivePlayerCell color={match?.activePlayer?.color}>&#x2B22;</ActivePlayerCell> {match?.activePlayer?.displayName} 
                </Display>
            }
        </Display>
}