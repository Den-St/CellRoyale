import { useState } from "react";
import { styled } from "styled-components";
import { Cell } from "./Cell";

const Row = styled.div<{marginleft:number,$isFirst:boolean}>`
    display:flex;
    ${({$isFirst}) => !$isFirst && `margin-top:-20px;`}
    ${({marginleft}) => `margin-left:${marginleft}px`}
`;

const Container = styled.div`
    display:flex;
    flex-direction:column;
`;

export const Map = () => {
    const [MapCoords,setMapCoords] = useState<Record<number, Record<number, number>>>({
        0:{0:6, 1:6, 2:6, 3:6, 4:6, 5:6, 6:6},
        1:{0:6, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:6},
        2:{0:6, 1:0, 2:0, 3:0, 4:0, 5:0, 6:5, 7:0, 8:6},
        3:{0:6, 1:0, 2:5, 3:0, 4:0, 5:0, 6:0, 7:0, 8:2, 9:6},
        4:{0:6, 1:1, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:6},
        5:{0:6, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:6},
        6:{0:6, 1:5, 2:0, 3:0, 4:0, 5:0, 6:5, 7:0, 8:0, 9:0, 10:0, 11:0, 12:6},
        7:{0:6, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:5, 10:0, 11:6},
        8:{0:6, 1:7, 2:7, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:6},
        9:{0:6, 1:3, 2:7, 3:0, 4:0, 5:5, 6:0, 7:0, 8:4, 9:6},
        10:{0:6, 1:8, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:6},
        11:{0:6, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:6},
        12:{0:6, 1:6, 2:6, 3:6, 4:6, 5:6, 6:6}  
    });
    
    const [myCoord,setMyCoord] = useState([9,1]);
    const onStep = (destinationCoord:number[]) => {
        if(destinationCoord[0] === myCoord[0] && destinationCoord[1] === myCoord[1]) return;
        
        setMapCoords(prev => {
            const x = destinationCoord[0];
            const y = destinationCoord[1];
            return ({...prev,[x]:{...prev[x], [y]: MapCoords[myCoord[0]][myCoord[1]]}});
        });
        setMapCoords(prev => {
            const myCordX = myCoord[0];
            const myCordY = myCoord[1];
            return ({...prev,[myCordX]:{...prev[myCordX], [myCordY]:0}});
        });

        setMyCoord(destinationCoord);
    }

    return  <Container>
            {Object.entries(MapCoords).map((row,i) => 
            <Row $isFirst={i === 0} marginleft={i < 7 ? (6 - i)*26 : (i - 6)*26}>
                {Object.entries(row[1]).map((cell,j) => <Cell onStep={() => onStep([i,j])} value={cell[1]}/>)}
            </Row>)}
        </Container>
    // return <span style={{color: "#6C6; font-size: 135px;"}}>&#x2B22;</span>
}