import { styled } from 'styled-components';
export const Timer = styled.h1`
    margin:0;
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
    align-items:center;
    ${({$isActivePlayer}) => $isActivePlayer && `background:blue`};
    border-radius:7px;
    width:100%;
`;



