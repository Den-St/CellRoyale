import { styled } from "styled-components";
import { BoosterT } from "../../types/booster";
import { UserT } from "../../types/user";

const colors = [
    '#9fa79f',
    'green',
    'purple',
    'red',
    'blue',
    'orange',
    '#8bc34a',
    '#e2aae2',
    '#75b4f79b',
    '#f7c64ab7',
    '#00e2ff',
]

const HexSpan = styled.button<{value:number,}>`
    border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:pointer;
    color:#9fa79f;
    font-size: 55px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    &:hover{
        opacity:0.95;
    }
`;

const UserHex = styled.button<{user:UserT}>`
     border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:pointer;
    ${({user}) => `color:${user.color}`};
    font-size: 55px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    &:hover{
        opacity:0.95;
    }
`;

const BoosterHex = styled.button<{booster:BoosterT}>`
    border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:pointer;
    color:orange;
    color:;
    font-size: 55px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    &:hover{
        opacity:0.95;
    }
`;

type CellProps = {
    value:number;
    onStep:() => void
}

export const Cell:React.FC<CellProps> = ({value,onStep}) => {
    return <HexSpan onClick={onStep} value={value}>
        &#x2B22;
    </HexSpan> 
}

type PlayerProps = {
    value:UserT;
    onStep:() => void
}
export const PlayerCell:React.FC<PlayerProps> = ({onStep,value}) => {
    return <UserHex onClick={onStep} user={value}>
        &#x2B22;
    </UserHex> 
}

type BoosterProps = {
    value:BoosterT;
    onStep:() => void
}
export const BoosterCell:React.FC<BoosterProps> = ({value,onStep}) => {
    return <BoosterHex onClick={onStep} booster={value}>
        &#x2B22;
    </BoosterHex> 
}