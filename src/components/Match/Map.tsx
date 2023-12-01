import { Button, Popconfirm, Spin, Tag } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
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
import {RedoOutlined} from '@ant-design/icons';
import { wrappedRoutes } from "../../consts/routes";
import { TimerComponent } from "./TimerComponent";

const Row = styled.div<{marginleft:number,$isFirst:boolean}>`
    display:flex;
    ${({$isFirst}) => !$isFirst && `margin-top:-22px;`};
    ${({marginleft}) => `margin-left:${marginleft * 21}px`};
    ${Media.up.xxxl}{
        ${({marginleft}) => `margin-left:${marginleft * 25.2}px`};
        ${({$isFirst}) => !$isFirst && `margin-top:-40px;`};
        display:flex;
    }
`;

const ActivePlayerCell = styled.span<{color?:string}>`
    font-size:40px;
    height:50px;
    ${({color}) => `color:${color}`};
`;

export const Map:React.FC<{loading:boolean}> = ({loading}) => {
    const {MapCoords,onStep,match,isEliminated,isWinner,matchResult,user,clearMapFromAvailableCells,mapCenter,isOnStep,makeUserNotActiveAtClient,} = useMap();
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
            <Display style={{flexDirection:'column',gap:'10px',width:'450px',background:'#00000084',height:'420px',borderRadius:'15px',alignItems:'center',padding:'10px',justifyContent:'center'}}>
                {match.alivePlayers?.length !== 1 && <ActionMessage>{hoveredCellMessage}</ActionMessage>}
                <Display style={{flexDirection:'row',gap:'10px'}}>
                    <Display style={{flexDirection:'column',gap:'10px',width:'35%',alignItems:'center'}}>
                        {match.alivePlayers?.length !== 1 && <TimerComponent clearMapFromAvailableCells={clearMapFromAvailableCells} makeUserNotActiveAtClient={makeUserNotActiveAtClient}/>}
                        {!loading ? <PlayersContainer>
                            {match.alivePlayers?.length !== 1 && match.alivePlayers?.map(alivePlayer => 
                                <PlayerItemContainer $isActivePlayer={alivePlayer?.id === match?.activePlayer?.id}>
                                    <ActivePlayerCell color={alivePlayer?.color || ''}>&#x2B22;</ActivePlayerCell> {alivePlayer?.displayName} 
                                </PlayerItemContainer>)
                            }
                        </PlayersContainer> : <Spin/>}
                    </Display>
                    <Display style={{flexDirection:'column',gap:'10px'}}>
                        {match.id && <Chat matchId={match.id}/>}
                        {isEliminated && !isWinner && !isModalOpened && <Button type="primary" onClick={() => setIsModalOpened(true)}>Back to menu</Button>}
                    </Display>
                </Display>
            </Display>
        </Display>
}