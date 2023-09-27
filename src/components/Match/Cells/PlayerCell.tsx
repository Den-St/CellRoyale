import { styled } from "styled-components";
import { useAppSelector } from "../../../hooks/redux";
import { UserT } from "../../../types/user";

const invisibleColorForOther = '#9fa79f';
const invisibleColors:Record<string,string> = {
    "purple":'#80008091',
    "green":'#008000a5',
}
const UserHex = styled.button<{user:UserT, 
// $isEnemy?: boolean
    $invisible:boolean,
    $isMe:boolean,}>`
    border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:pointer;
    ${({user}) => `color:${user.color}`};
    ${({$invisible}) => $invisible && `color:${invisibleColorForOther}`};
    ${({$invisible,$isMe,user}) => $invisible && $isMe && user.color && `color:${invisibleColors[user.color]};`};
    font-size: 55px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;color:rgba(invisibleColorForMe,4);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &:hover{
        opacity:0.95;
    }
`;

export const AvailableToEliminateCell = styled.span<{$invisible:boolean}>`
    padding:0;
    cursor:pointer;
    font-size: 20px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    ${({$invisible}) => $invisible ? `color:#75b4f7;` : `color:#000000;`};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:37%;
    left:32.5%;
`;

type PlayerProps = {
    value:UserT;
    onStep:() => void
    $invisible:boolean,
    $availableToEliminate:boolean,
} 
export const PlayerCell:React.FC<PlayerProps> = ({onStep,value,$invisible,$availableToEliminate}) => {
    const userId = useAppSelector(state => state.user.id);
    // const isEnemy = userId !== value.id;
    return <UserHex onClick={onStep} user={value} $invisible={$invisible} $isMe={userId === value.id}
    // $isEnemy={isEnemy}
    >
        &#x2B22;
        {$availableToEliminate && <AvailableToEliminateCell $invisible={$invisible}>&#x2B22;</AvailableToEliminateCell>}
    </UserHex> 
}