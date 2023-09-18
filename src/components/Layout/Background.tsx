import styled from "styled-components"
import { Display } from "../../assets/Display"

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
    ];

    return <Display
        style={{
            zIndex:"-1",
            top:"-180px",
            left:"-450px",
            position:"absolute",
            width:"131.2vw",
            height:"125.4vh",
            minWidth:"100%",
            minHeight:"100%",
            overflow:'hidden'
        }}
        >
        <Display style={{flexDirection:"column"}}>
            {MapCoords.map((row,i) => 
                <Row key={i} marginleft={i * 125}>
                    {row.map((cell,j) => <Hex key={j} value={cell}>&#x2B22;</Hex>)}
                </Row>
            )}
        </Display>
    </Display>
}