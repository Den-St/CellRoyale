import { styled } from "styled-components";
import { Media } from "../../../assets/breakpoints";
import { useAppSelector } from "../../../hooks/redux";
import { CellT } from "../../../types/cell";
import { UserT } from "../../../types/user";

const invisibleColorForOther = '#9fa79f';
const invisibleColors:Record<string,string> = {
    "purple":'#80008091',
    "green":'#008000a5',
    "red":'#e71010a1',
    'blue':'#162ee5534',
    'orange':'#ec8217445',
    '#00e2ff':'#5cf4f453',
}
const UserHex = styled.button<{user:UserT, 
// $isEnemy?: boolean
    $invisible:boolean,
    $isMe:boolean,}>`
    border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:url(https://www.clipartmax.com/png/small/108-1087676_close-remove-delete-exit-cross-cancel-trash-comments-close-button-icon-png.png),pointer;
    ${({user}) => `color:${user.color}`};
    ${({$invisible}) => $invisible && `color:${invisibleColorForOther}`};
    ${({$invisible,$isMe,user}) => $invisible && $isMe && user.color && `color:${invisibleColors[user.color]};`};
    font-size: 50px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    width:42px;
    position: relative;
    &:hover{
        opacity:0.95;
    }
    ${Media.up.xxxl}{
        font-size: 75px;
        width:50px;
    }
`;

export const AvailableToEliminateCell = styled.span<{$invisible:boolean,$isMe:boolean}>`
    padding:0;
    cursor:pointer;
    font-size: 20px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    ${({$invisible,$isMe}) => !$isMe ? $invisible ? `color:#4877f9` : `color:#000000` : 'color:#9fa79f'};
    display: flex;
    position: absolute;
    top:38%;
    left:32.5%;
    ${Media.up.xxxl}{
        top:31.5%;
        left:37%;
        font-size: 30px;
    }
`;

type PlayerProps = {
    cell:CellT;
    onStep:() => void
    $invisible:boolean,
    activateOnHover:(cell:CellT) => void,
    clearHover:() => void
} 
export const PlayerCell:React.FC<PlayerProps> = ({onStep,cell,$invisible,activateOnHover,clearHover}) => {
    const userId = useAppSelector(state => state.user.id);
    // const isEnemy = userId !== value.id;
    return <UserHex onMouseEnter={!$invisible ? () => activateOnHover(cell) : () => {}} onMouseLeave={clearHover} onClick={onStep} user={cell.value as UserT} $invisible={$invisible} $isMe={userId === (cell.value as UserT).id}
    // $isEnemy={isEnemy}
    >
        &#x2B22;
        {cell.isAvailable && <AvailableToEliminateCell $isMe={userId === (cell.value as UserT).id} $invisible={$invisible}>&#x2B22;</AvailableToEliminateCell>}
    </UserHex> 
}