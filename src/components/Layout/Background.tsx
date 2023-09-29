import styled from "styled-components"
import { Media } from "../../assets/breakpoints";
import { Display } from "../../assets/Display"

const colors = [
    '#D9D9D9',
    '#EBC1F2'
]

const Row = styled.div<{marginleft:number}>`
    display:flex;
    ${({marginleft}) => `margin-left:${marginleft  * 125}px`};
    margin-top:-85px;
    width:100%;
    ${Media.up.xxxl}{
        margin-top:-200px;
        ${({marginleft}) => `margin-left:${marginleft * 170}px`};
    }
`;

export const Hex = styled.span<{value:number}>`
    ${({value}) => `color:${colors[value]}`};
    font-size:300px;
    height:300px;
    width: 250px;
    user-select: none;
    ${Media.up.xxxl}{
        font-size:500px;
        height:500px;
        width: 340px;
    }
`;

const Container = styled.div`
    display:flex;
    box-sizing:border-box;
    z-index:-1;
    top:-180px;
    left:-450px;
    position:absolute;
    width:131.2vw;
    height:125vh;
    min-width:100%;
    min-height:100%;
    overflow:hidden;
    ${Media.up.xxxl}{
        top:-207px;
        left:-657px;
        width:134.2vw;
        height:121.4vh;
        overflow:hidden;
    }
`;

export const Background = () => {
    const MapCoords = [
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,],
        [0,0,0,0,0,0,1],
        [0,0,0,0,0,1],
        [1,1,1,1,1]
    ];

    return <Container
        >
        <Display style={{flexDirection:"column"}}>
            {MapCoords.map((row,i) => 
                <Row key={i} marginleft={i}>
                    {row.map((cell,j) => <Hex key={j} value={cell}>&#x2B22;</Hex>)}
                </Row>
            )}
        </Display>
    </Container>
}