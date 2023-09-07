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
        0:{0:7, 1:7, 2:7, 3:7, 4:7, 5:7, 6:7, 7:7,},
        1:{0:7, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:7},
        2:{0:7, 1:0, 2:0, 3:0, 4:0, 5:10, 6:0, 7:0, 8:0, 9:7},
        3:{0:7, 1:0, 2:0, 3:5, 4:0, 5:0, 6:0, 7:5, 8:0, 9:0, 10:7},
        4:{0:7, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:7},
        5:{0:7, 1:0, 2:1, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:2, 11:0, 12:7},
        6:{0:7, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:7},
        7:{0:7, 1:0, 2:0, 3:5, 4:0, 5:0, 6:0, 7:5, 8:0, 9:0, 10:0, 11:5, 12:0, 13:0, 14:7},
        8:{0:7, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:0, 13:7},
        9:{0:7, 1:0, 2:3, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0, 10:0, 11:0, 12:7},
        10:{0:7, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0,9:0, 10:0, 11:7},
        11:{0:7, 1:0, 2:0, 3:5, 4:0, 5:0, 6:0, 7:5, 8:0,9:4, 10:7},
        12:{0:7, 1:0, 2:0, 3:0, 4:6, 5:0, 6:0, 7:0, 8:0,9:7},
        13:{0:7, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:7},
        14:{0:7, 1:7, 2:7, 3:7, 4:7, 5:7, 6:7, 7:7,}  
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
            <Row $isFirst={i === 0} marginleft={i < 8 ? (7 - i)*26 : (i - 7)*26}>
                {Object.entries(row[1]).map((cell,j) => <Cell onStep={() => onStep([i,j])} value={cell[1]}/>)}
            </Row>)}
        </Container>
}