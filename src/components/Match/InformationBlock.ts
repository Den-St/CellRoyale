import { styled } from 'styled-components';
export const Timer = styled.h1<{time:number}>`
    margin:0;
    ${({time}) => time > 5 ? 'color:green' : 'color:red'};
`;
export const ActionMessage = styled.h1`
    margin:0;
`;
export const PlayersContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;
`;
export const PlayerItemContainer = styled.div<{$isActivePlayer:boolean}>`
    display:flex;
    gap:10px;
    font-size:20px;
    align-items:center;
    ${({$isActivePlayer}) => $isActivePlayer && `background:#1677ff`};
    border-radius:7px;
    width:150px;
    overflow:hidden;
`;



