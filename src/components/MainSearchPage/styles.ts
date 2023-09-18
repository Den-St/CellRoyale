import { Link } from 'react-router-dom';
import { styled } from "styled-components";

export const ToogleSearchButton = styled.button<{$search:boolean}>`
    width:100px;
    height:50px;
    border:none;
    outline:none;
    transition:0.1s;
    ${({$search}) => $search ? `background:#ebc1f2;` : `background:#D9D9D9;`};
    ${({$search}) => $search ? `transform: translateY(-52px);` : `transform: translateY(20px);`};
    border-radius:10px;
    cursor:pointer;
`;

export const NumberOfPlayers = styled.div`
    margin:0;
    height:20px;
    display:flex;
    flex-direction:column;
    align-items:center;
`;

export const GameRulesLink = styled(Link)`

`;

export const SupportLink = styled(Link)`
    
`;

export const Rating = styled.h1`
    margin:0;
    font-size:23px;
`;