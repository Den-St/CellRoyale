import { styled } from "styled-components";
import { CellT } from "../../../types/cell";

const colors = [
    '#9fa79f',
    '#9fa79f',
    '#eb52eb90'
]
const HexSpan = styled.button<{value:number,}>`
    border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:pointer;
    position:relative;
    ${({value}) => `color:${colors[value]}`};
    font-size: 55px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    &:hover{
        opacity:0.9;
    }
`;

const AvailableCell = styled.span`
    padding:0;
    cursor:pointer;
    font-size: 20px;
    border-radius:100%;
    user-select: none;
    color:#4877f9;
    position:absolute;
    top:37%;
    left:32.5%;
`;

type CellProps = {
    cell:CellT;
    onStep:() => void,
    $isAvailable:boolean,
    activateOnHover:(cell:CellT) => void,
    clearHover:() => void

}

export const Cell:React.FC<CellProps> = ({cell,onStep,$isAvailable,clearHover,activateOnHover}) => {
    return <HexSpan onMouseEnter={() => activateOnHover(cell)} onMouseLeave={clearHover} onClick={onStep} value={cell.value as number}>
        &#x2B22;
        {$isAvailable && <AvailableCell>&#x2B22;</AvailableCell>}
    </HexSpan> 
}