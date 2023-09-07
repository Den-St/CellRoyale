import { styled } from "styled-components";

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

const HexSpan = styled.button<{$isBooster:boolean,value:number}>`
    border:none;
    outline:none;
    background:transparent;
    padding:0;
    cursor:pointer;
    ${({value}) => `color:${colors[value]}`};
    ${({value}) => (value === 6 || value === 0) && `cursor:initial`};
    font-size: 55px;
    border-radius:100%;
    transition:0.1s;
    user-select: none;
    &:hover{
        ${({value}) => value === 0 &&`color:#9fa79f9e;`};
        opacity:0.95;
    }
`;


type Props = {
    value:number;
    onStep:() => void
}

export const Cell:React.FC<Props> = ({value,onStep}) => {
    return <HexSpan disabled={value === 6} onClick={onStep} $isBooster={value === 1} value={value} >
        &#x2B22;
    </HexSpan>
}