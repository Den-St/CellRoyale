import { changePlayersLocation } from './../firebase/db/users/edit/changeLocation';
import { useEffect } from 'react';
import { BoosterT } from './../types/booster';
import { useState } from 'react';
import { nextTurn } from './../firebase/db/matches/edit/nextTurn';
import { useAppSelector } from './redux';
import { useParams } from 'react-router-dom';
import { UserT } from '../types/user';
import { MapT } from '../types/map';

export const useMap = () => {
    const [MapCoords,setMapCoords] = useState<MapT>({
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
    const [myCoord,setMyCoord] = useState<number[]>();

    useEffect(() => {
        if(user.location) setMyCoord(user.location);
    },[user.location]);

    const clearMap = () => {
        setMapCoords(prev => {
            const clearedMap:MapT = prev;

            Object.keys(prev).forEach(
                x => Object.keys(prev[+x]).forEach(y => {
                    if(clearedMap[+x][+y].type === 'player'){
                        clearedMap[+x][+y] = {type:'cell',value:0};
                    }
                }));

                return clearedMap;
        });
    }

    const loadMap = () => {
        if(!match) return;
        
        clearMap();

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
    }
    useEffect(() => {
        loadMap();
    },[match]);

    const onStep = async (destinationCoord:number[]) => {
        if(!match.id || !user.id) return;
        if(match?.activePlayer?.id !== user.id) return;
        if(destinationCoord[0] === user?.location?.[0] && destinationCoord[1] === user?.location[1]) return;

        setMapCoords(prev => {
            const x = destinationCoord[0];
            const y = destinationCoord[1];

            return ({...prev,[x]:{...prev[x], [y]: {type:'player',value:user}},
            });
        });

        setMapCoords(prev => {
            const x = myCoord?.[0];
            const y = myCoord?.[1]; 

            if(!x || !y) return prev;
            return ({...prev,[x]:{...prev[x], [y]:{type:'cell',value:0}}});
        });

        setMyCoord(destinationCoord);
        await changePlayersLocation(user.id,destinationCoord);
        await nextTurn(match.id,user.id);
    }
    return {MapCoords,onStep,match}
}