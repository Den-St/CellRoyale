import { Tag } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { Media } from "../../assets/breakpoints";
import { Display } from "../../assets/Display";
import { boostersTypesNames } from "../../consts/boostersTypesNames";
import { useHoverCell } from "../../hooks/hoverCell";
import { useMap } from "../../hooks/map.hook";
import { useStepTimer } from "../../hooks/stepTimer.hook";
import { UserT } from "../../types/user";
import { Chat } from "../Chat";
import { MatchResultModal } from "../MatchResultModal";
import { BoosterCell } from "./Cells/Booster";
import { Cell } from "./Cells/Cell";
import {PlayerCell} from './Cells/PlayerCell';
import { ActionMessage, PlayerItemContainer, PlayersContainer, Timer } from "./InformationBlock";
  
const Row = styled.div<{marginleft:number,$isFirst:boolean}>`
    display:flex;
    ${({$isFirst}) => !$isFirst && `margin-top:-25px;`};
    ${({marginleft}) => `margin-left:${marginleft * 23}px`};
    ${Media.up.xxxl}{
        ${({marginleft}) => `margin-left:${marginleft * 25.2}px`};
        ${({$isFirst}) => !$isFirst && `margin-top:-40px;`};
        display:flex;
    }
`;

const ActivePlayerCell = styled.span<{color?:string}>`
    font-size:40px;
    ${({color}) => `color:${color}`};
`;

export const Map = () => {
    const {MapCoords,onStep,match,isEliminated,isWinner,matchResult,user,clearMapFromAvailableCells,mapCenter,isOnStep} = useMap();
    // const {timer} = useStepTimer(clearMapFromAvailableCells);
    const [isModalOpened,setIsModalOpened] = useState(true);
    const {onChangeHoveredCell,onClearHoveredCell,hoveredCellMessage} = useHoverCell();
    return  <Display style={{display:'flex',gap:'50px',alignItems:'center',padding:'0 30px',justifyContent:'space-between',width:'100%'}}>   
            <MatchResultModal isWinner={isWinner} isModalOpened={isModalOpened} matchResult={matchResult} open={(isWinner || isEliminated) && isModalOpened} onClose={() => setIsModalOpened(false)}/>
            <Display style={{flexDirection:"column"}}>
                {Object.entries(MapCoords).map((row,i) => 
                <Row $isFirst={i === 0} marginleft={i < mapCenter ? (mapCenter - 1 - i) : (i - (mapCenter - 1))} >
                    {Object.entries(row[1]).map((cell,j) => {
                        if(cell[1].type === 'cell') return <Cell activateOnHover={onChangeHoveredCell} clearHover={onClearHoveredCell} onStep={() => !isOnStep && onStep([i,j])} cell={cell[1]} />
                        if(cell[1].type === 'player') return <PlayerCell activateOnHover={onChangeHoveredCell} clearHover={onClearHoveredCell} $invisible={(cell[1].value as UserT).activeBooster?.name === boostersTypesNames.invisibility}  onStep={() => !isOnStep && onStep([i,j])} cell={cell[1]} />
                        if(cell[1].type === 'booster') return <BoosterCell activateOnHover={onChangeHoveredCell} clearHover={onClearHoveredCell} onStep={() => !isOnStep && onStep([i,j])} cell={cell[1]}/>
                    })}
                </Row>)}
            </Display>
            <Display style={{flexDirection:'column',gap:'10px',width:'350px',background:'#00000084',height:'600px',borderRadius:'15px',alignItems:'center',padding:'10px'}}>
                <h1>{match?.activePlayer?.id}</h1>
                <h1>{+isOnStep}</h1>
                <Timer>9,6</Timer>
                <ActionMessage>{hoveredCellMessage}</ActionMessage>
                <PlayersContainer>
                    {match.alivePlayers?.map(alivePlayer => 
                        <PlayerItemContainer $isActivePlayer={alivePlayer?.id === match?.activePlayer?.id}>
                            <ActivePlayerCell color={alivePlayer?.color || ''}>&#x2B22;</ActivePlayerCell> {alivePlayer?.displayName} 
                        </PlayerItemContainer>)
                    }
                </PlayersContainer>
                {match.id && <Chat matchId={match.id}/>}
                {isEliminated && !isWinner && !isModalOpened && <button onClick={() => setIsModalOpened(true)}>open modal</button>}
            </Display>
        </Display>
}