import { styled } from "styled-components";
import { Media } from "../../../assets/breakpoints";
import { BoosterT } from "../../../types/booster";
import { CellT } from "../../../types/cell";

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
    position:relative;
    &:hover{
        opacity:0.95;
    }
    ${Media.up.xxxl}{
        font-size: 75px;
        width:50px;
    }
`;
export const AvailableToStepCell = styled.span`
    padding:0;
    cursor:pointer;
    font-size: 20px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    color:black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:38%;
    left:32.5%;
    ${Media.up.xxxl}{
        top:31.5%;
        left:37%;
        font-size: 30px;
    }
`;

type BoosterProps = {
    cell:CellT;
    onStep:() => void,
    $availableToStep:boolean,
    activateOnHover:(cell:CellT) => void,
    clearHover:() => void
}
export const BoosterCell:React.FC<BoosterProps> = ({cell,onStep,$availableToStep,clearHover,activateOnHover}) => {
    return <BoosterHex onMouseEnter={() => activateOnHover(cell)} onMouseLeave={clearHover} onClick={onStep} booster={cell.value as BoosterT}>
        &#x2B22;
        {$availableToStep && <AvailableToStepCell>&#x2B22;</AvailableToStepCell>}
    </BoosterHex> 
}