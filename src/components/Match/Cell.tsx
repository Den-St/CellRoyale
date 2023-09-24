import { css } from "styled-components";
import { styled } from "styled-components";
import { useAppSelector } from "../../hooks/redux";
import { BoosterT } from "../../types/booster";
import { UserT } from "../../types/user";

const colors = [
    '#9fa79f',
    '#75b4f79b',
    '#eb52eb90'
]

const HexSpan = styled.button<{value:number,}>`
    border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:pointer;
    ${({value}) => `color:${colors[value]}`};
    font-size: 55px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    &:hover{
        opacity:0.95;
    }
`;

// const enemy = css`
//         content: '🗡️';
//         font-size: 16px;
//         position: absolute;
// `;

const invisibleColorForMe = '#6bff6b4';
const invisibleColorForOther = colors[0];
const UserHex = styled.button<{user:UserT, 
// $isEnemy?: boolean
    $invisible:boolean,
    $isMe:boolean
        }>`
     border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:pointer;
    ${({user}) => `color:${user.color}`};
    ${({$invisible}) => $invisible && `color:${invisibleColorForOther}`};
    ${({$invisible,$isMe}) => $invisible && $isMe && `color:${invisibleColorForMe}`};
    font-size: 55px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover{
        opacity:0.95;
    }
`;
  /* &::after {
            ${({$isEnemy}) => $isEnemy && enemy}
            } */
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
    $invisible:boolean,
} 
export const PlayerCell:React.FC<PlayerProps> = ({onStep,value,$invisible}) => {
    const userId = useAppSelector(state => state.user.id);
    console.log('gdgdf',userId,value)
    // const isEnemy = userId !== value.id;
    return <UserHex onClick={onStep} user={value} $invisible={$invisible} $isMe={userId === value.id}
    // $isEnemy={isEnemy}
    >
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