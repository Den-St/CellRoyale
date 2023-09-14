import styled from "styled-components"
import { Display } from "../../assets/Display"
import { Cell } from "../Match/Cell";

const colors = [
    '#D9D9D9',
    '#EBC1F2'
]

const Row = styled.div<{marginleft:number}>`
    display:flex;
    ${({marginleft}) => `margin-left:${marginleft}px`};
    margin-top:-85px;
    width:100%;
`;

export const Hex = styled.span<{value:number}>`
    ${({value}) => `color:${colors[value]}`};
    font-size:300px;
    height:300px;
    width: 250px;
    user-select: none;
`;

export const Background = () => {
    const MapCoords = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,1],
        [0,0,0,0,0,1],
        [1,1,1,1,1]
    ]
    return <Display
    zIndex="-1"
    top={'-180px'} left={"-450px"} position="absolute"
    >
        <Display  direction="column">
            {MapCoords.map((row,i) => 
                <Row marginleft={i * 125}>
                    {row.map(cell => <Hex value={cell}>&#x2B22;</Hex>)}
                </Row>
            )}
        </Display>
    </Display>
}