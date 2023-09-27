import { styled } from "styled-components";
import { BoosterT } from "../../../types/booster";

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
`;
export const AvailableToStepCell = styled.span`
    padding:0;
    cursor:pointer;
    font-size: 20px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    color:#75b4f7;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top:37%;
    left:32.5%;
`;

type BoosterProps = {
    value:BoosterT;
    onStep:() => void,
    $availableToStep:boolean
}
export const BoosterCell:React.FC<BoosterProps> = ({value,onStep,$availableToStep}) => {
    return <BoosterHex onClick={onStep} booster={value}>
        &#x2B22;
        {$availableToStep && <AvailableToStepCell>&#x2B22;</AvailableToStepCell>}
    </BoosterHex> 
}