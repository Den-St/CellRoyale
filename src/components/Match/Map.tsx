import { useState } from "react";
import { styled } from "styled-components";
import { Display } from "../../assets/Display";
import { boostersTypesNames } from "../../consts/boostersTypesNames";
import { isAvailableCell } from "../../helpers/isAvailableCell";
import { useHoverCell } from "../../hooks/hoverCell";
import { useMap } from "../../hooks/map.hook";
import { useAppSelector } from "../../hooks/redux";
import { useStepTimer } from "../../hooks/stepTimer.hook";
import { BoosterT } from "../../types/booster";
import { CellT, CellTypeT } from "../../types/cell";
import { UserT } from "../../types/user";
import { MatchResultModal } from "../MatchResultModal";
import { BoosterCell } from "./Cells/Booster";
import { Cell } from "./Cells/Cell";
import {PlayerCell} from './Cells/PlayerCell';

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
    const {MapCoords,onStep,match,isEliminated,isWinner,matchResult,user,clearMapFromAvailableCells} = useMap();
    const {timer} = useStepTimer(clearMapFromAvailableCells);
    const [isModalOpened,setIsModalOpened] = useState(true);
    const {onChangeHoveredCell,onClearHoveredCell,hoveredCellMessage} = useHoverCell();
    
    return  <Display>   
            <MatchResultModal isWinner={isWinner} isModalOpened={isModalOpened} matchResult={matchResult} open={(isWinner || isEliminated) && isModalOpened} onClose={() => setIsModalOpened(false)}/>
            <Display style={{flexDirection:"column"}}>
                {Object.entries(MapCoords).map((row,i) => 
                <Row $isFirst={i === 0} marginleft={i < 8 ? (7 - i)*26 : (i - 7)*26} >
                    {Object.entries(row[1]).map((cell,j) => {
                        if(cell[1].type === 'cell') return <Cell activateOnHover={onChangeHoveredCell} clearHover={onClearHoveredCell} $isAvailable={cell[1].isAvailable} onStep={() => onStep([i,j])} cell={cell[1]} />
                        if(cell[1].type === 'player') return <PlayerCell activateOnHover={onChangeHoveredCell} clearHover={onClearHoveredCell} $availableToEliminate={cell[1].isAvailable} $invisible={(cell[1].value as UserT).activeBooster?.name === boostersTypesNames.invisibility}  onStep={() => onStep([i,j])} cell={cell[1]} />
                        if(cell[1].type === 'booster') return <BoosterCell activateOnHover={onChangeHoveredCell} clearHover={onClearHoveredCell} $availableToStep={cell[1].isAvailable} onStep={() => onStep([i,j])} cell={cell[1]}/>
                    })}
                </Row>)}
            </Display>
            <Display style={{flexDirection:'column',gap:'10px',width:'150px'}}>
                <h1>{timer}</h1>
                <h1>{hoveredCellMessage}</h1>
                {match?.activePlayer?.color && 
                    <Display style={{alignContent:'center'}}>
                        <ActivePlayerCell color={match?.activePlayer?.color}>&#x2B22;</ActivePlayerCell> {match?.activePlayer?.displayName} 
                    </Display>
                }
                {isEliminated && !isWinner && !isModalOpened && <button onClick={() => setIsModalOpened(true)}>open modal</button>}
            </Display>
        </Display>
}