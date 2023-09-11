import { useEffect } from 'react';
import { BoosterT } from './../types/booster';
import { useState } from 'react';
import { nextTurn } from './../firebase/db/matches/edit/nextTurn';
import { useAppSelector } from './redux';
import { useParams } from 'react-router-dom';
import { UserT } from '../types/user';

export const useMap = () => {
    const [MapCoords,setMapCoords] = useState<Record<number, Record<number, {type:'cell' | 'player' | 'booster' ,value:number | UserT | BoosterT}>>>({
        0:{0:{type:'cell',value:7}, 1:{type:'cell',value:7}, 2:{type:'cell',value:7}, 3:{type:'cell',value:7}, 4:{type:'cell',value:7}, 5:{type:'cell',value:7}, 6:{type:'cell',value:7}, 7:{type:'cell',value:7},},
        1:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:7}},
        2:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:7}},
        3:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:7}},
        4:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:7}},
        5:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:7}},
        6:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:0}, 13:{type:'cell',value:7}},
        7:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:0}, 13:{type:'cell',value:0}, 14:{type:'cell',value:7}},
        8:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:0}, 13:{type:'cell',value:7}},
        9:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:7}},
        10:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0},9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:7}},
        11:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0},9:{type:'cell',value:0}, 10:{type:'cell',value:7}},
        12:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0},9:{type:'cell',value:7}},
        13:{0:{type:'cell',value:7}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:7}},
        14:{0:{type:'cell',value:7}, 1:{type:'cell',value:7}, 2:{type:'cell',value:7}, 3:{type:'cell',value:7}, 4:{type:'cell',value:7}, 5:{type:'cell',value:7}, 6:{type:'cell',value:7}, 7:{type:'cell',value:7},}  
    });
    const matchId = useParams().id;
    const user = useAppSelector(state => state.user);
    const match = useAppSelector(state => state.match);
    useEffect(() => {
        if(!match) return;

        match.alivePlayers?.forEach(player => setMapCoords(prev => {
            const x = player.location?.[0];
            const y = player.location?.[1];
            if(!x || !y) return prev;

            return ({...prev,[x]:{...prev[x], [y]: {type:'player',value:player}}});
        }));

        match.boosters?.forEach(booster => setMapCoords(prev => {
            const x = booster.location?.[0];
            const y = booster.location?.[1];
            if(!x || !y) return prev;

            return ({...prev,[x]:{...prev[x], [y]: {type:'booster',value:booster}}});
        }));
    },[match]);

    const [myCoord,setMyCoord] = useState([9,1]);
    const onStep = async (destinationCoord:number[]) => {
        if(!matchId || !user.id) return;
        if(destinationCoord[0] === myCoord[0] && destinationCoord[1] === myCoord[1]) return;

        await nextTurn(matchId,user.id)

        setMapCoords(prev => {
            const x = destinationCoord[0];
            const y = destinationCoord[1];
            return ({...prev,[x]:{...prev[x], [y]: {type:'player',value:user}}});
        });
        setMapCoords(prev => {
            const myCordX = myCoord[0];
            const myCordY = myCoord[1];
            return ({...prev,[myCordX]:{...prev[myCordX], [myCordY]:{type:'cell',value:0}}});
        });

        setMyCoord(destinationCoord);
    }

    return {MapCoords,onStep,match}
}