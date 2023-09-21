import { eliminatePlayer } from '../firebase/db/matches/edit/eliminatePlayer';
import { UserT } from './../types/user';
import { changePlayersLocation } from './../firebase/db/users/edit/changeLocation';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { nextTurn } from './../firebase/db/matches/edit/nextTurn';
import { useAppSelector } from './redux';
import { MapT } from '../types/map';
import { addWinner } from '../firebase/db/matchResults/edit/addWinner';
import { clearPlayersMatchInfo } from '../firebase/db/users/edit/clearPlayersMatchInfo';
import { maxPlayersNumber } from '../consts/maxPlayersNumber';

export const useMap = () => {
    const [MapCoords,setMapCoords] = useState<MapT>({
        0:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0},},
        1:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}},
        2:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}},
        3:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}},
        4:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}},
        5:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:0}},
        6:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:0}, 13:{type:'cell',value:0}},
        7:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:0}, 13:{type:'cell',value:0}, 14:{type:'cell',value:0}},
        8:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:0}, 13:{type:'cell',value:0}},
        9:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}, 9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}, 12:{type:'cell',value:0}},
        10:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0},9:{type:'cell',value:0}, 10:{type:'cell',value:0}, 11:{type:'cell',value:0}},
        11:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0},9:{type:'cell',value:0}, 10:{type:'cell',value:0}},
        12:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0},9:{type:'cell',value:0}},
        13:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0}, 8:{type:'cell',value:0}},
        14:{0:{type:'cell',value:0}, 1:{type:'cell',value:0}, 2:{type:'cell',value:0}, 3:{type:'cell',value:0}, 4:{type:'cell',value:0}, 5:{type:'cell',value:0}, 6:{type:'cell',value:0}, 7:{type:'cell',value:0},}  
    });
    const [isEliminated,setIsEliminated] = useState(false);
    const [isWinner,setIsWinner] = useState(false);
    const user = useAppSelector(state => state.user);
    const match = useAppSelector(state => state.match);
    const matchResult = useAppSelector(state => state.matchResult);
    const [myCoord,setMyCoord] = useState<number[]>();

    useEffect(() => {
        if(user.location) setMyCoord(user.location);
    },[user.location]);
    console.log(MapCoords);

    const clearMap = () => {
        setMapCoords(prev => {
            const clearedMap:MapT = prev;

            Object.keys(prev).forEach(
                x => Object.keys(prev[+x]).forEach(y => {
                    if(clearedMap[+x][+y].type === 'player' || clearedMap[+x][+y].value === 1){
                        clearedMap[+x][+y] = {type:'cell',value:0};
                    }
                }));

                return clearedMap;
        });
    }
    const clearMapFromAvailableCells = () => {
        setMapCoords(prev => {
            const clearedMap:MapT = prev;

            Object.keys(prev).forEach(
                x => Object.keys(prev[+x]).forEach(y => {
                    if( clearedMap[+x][+y].value === 1){
                        clearedMap[+x][+y] = {type:'cell',value:0};
                    }
                }));

                return clearedMap;
        });
    }
    const displayZoneCells = () => {
        setMapCoords(prev => {
            if(!match.roundNumber || !match.id || match.roundNumber === 1) return prev;

            const newMap = prev;
            for(let i = 1; i < match.roundNumber; i++)
            {
                Object.keys(newMap[i - 1]).forEach(y => {
                    if(myCoord && i - 1 === myCoord[0] && +y === myCoord[1]){
                        if(user.id){
                            setIsEliminated(true);
                            eliminatePlayer(match.id,user.id)
                        }
                    }
                    newMap[i - 1][+y] = {type:'cell',value:2};
                });
                Object.keys(newMap[15 - i]).forEach(y => {
                    if(myCoord && 15 - i === myCoord[0] && +y === myCoord[1]){
                        if(user.id){
                            setIsEliminated(true);
                            eliminatePlayer(match.id,user.id);
                        }
                    } 
                    newMap[15 - i][+y] = {type:'cell',value:2};
                });
                Object.keys(newMap).forEach(
                    x => Object.keys(newMap[+x]).forEach(y => {
                        if(match.roundNumber !== undefined && (+y < match.roundNumber - 1 || +y > Object.keys(newMap[+x]).length - match.roundNumber)){
                            if(myCoord && +x === myCoord[0] && +y === myCoord[1]){
                                if(user.id) {
                                    setIsEliminated(true);
                                    eliminatePlayer(match.id,user.id);
                                }
                            }
                            newMap[+x][+y] = {type:'cell',value:2};
                        }
                    }));
            }
            return newMap;
        });
    }

    const displayAlivePlayers = () => {
        match.alivePlayers?.forEach(player => setMapCoords(prev => {
            const x = player.location?.[0];
            const y = player.location?.[1];
            if(x === undefined || y === undefined) return prev;

            return ({...prev,[x]:{...prev[x], [y]: {type:'player',value:player}}});
        }));
    }
    const displayBoosters = () => {
        match.boosters?.forEach(booster => setMapCoords(prev => {
            const x = booster.location?.[0];
            const y = booster.location?.[1];
            if(!x || !y) return prev;

            return ({...prev,[x]:{...prev[x], [y]: {type:'booster',value:booster}}});
        }));
    }
    const loadMap = () => {
        if(!match) return;

        clearMap();
        displayZoneCells();
        displayAlivePlayers();
        displayBoosters();
        setAvailableCells();
    }
    const setAvailableCells = () => {
        if(isWinner || isEliminated) return;
        if(match?.activePlayer?.id !== user.id) return;
        if(!myCoord) return;

        setMapCoords(prev => {
            const newMap:MapT = prev;

            Object.keys(prev).forEach(
                x => Object.keys(prev[+x]).forEach(y => {
                    if(newMap[+x][+y].type !== 'player' && newMap[+x][+y].type !== 'booster'){
                        if(myCoord[0] < 7){
                            if(+x === myCoord?.[0] - 1 ){
                                if(+y === myCoord?.[1] - 1 || +y === myCoord?.[1]){
                                    newMap[+x][+y] = {type:'cell',value:1};
                                }
                            }
                            if(+x === myCoord[0] + 1){
                                if(+y === myCoord?.[1] + 1 || +y === myCoord?.[1]){
                                    newMap[+x][+y] = {type:'cell',value:1};
                                }
                            }
                            if(+x === myCoord[0]){
                                if(+y === myCoord?.[1] + 1 || +y === myCoord?.[1] - 1){
                                    newMap[+x][+y] = {type:'cell',value:1};
                                }
                            }
                        }else if(myCoord[0] > 7){
                            if(+x === myCoord?.[0] - 1 ){
                                if(+y === myCoord?.[1] + 1 || +y === myCoord?.[1]){
                                    newMap[+x][+y] = {type:'cell',value:1};
                                }
                            }
                            if(+x === myCoord[0] + 1){
                                if(+y === myCoord?.[1] - 1 || +y === myCoord?.[1]){
                                    newMap[+x][+y] = {type:'cell',value:1};
                                }
                            }
                            if(+x === myCoord[0]){
                                if(+y === myCoord?.[1] + 1 || +y === myCoord?.[1] - 1){
                                    newMap[+x][+y] = {type:'cell',value:1};
                                }
                            }
                        }else{
                            if(+x === myCoord?.[0] - 1 || +x === myCoord[0] + 1){
                                if(+y === myCoord?.[1] - 1 || +y === myCoord?.[1]){
                                    newMap[+x][+y] = {type:'cell',value:1};
                                }
                            }
                            if(+x === myCoord[0]){
                                if(+y === myCoord?.[1] - 1 || +y === myCoord?.[1] + 1){
                                    newMap[+x][+y] = {type:'cell',value:1};
                                }
                            }
                        }
                    }
                }));

                return newMap;
        });
    };

    useEffect(() => {
        loadMap();
    },[match]);

    
    const onStep = async (destinationCoord:number[]) => {
        if(isEliminated || isWinner) return;
        if(!myCoord) return;
        if(!match.id || !user.id) return;
        if(match?.activePlayer?.id !== user.id) return;
        
        if(!(destinationCoord[0] === myCoord[0] || destinationCoord[0] === myCoord[0] + 1 || destinationCoord[0] === myCoord[0] - 1)) return;
        let enemyId = MapCoords[destinationCoord[0]][destinationCoord[1]].type === 'player' ? (MapCoords[destinationCoord[0]][destinationCoord[1]].value as UserT).id : null;

        if(myCoord[0] < 7){
            if(destinationCoord[0] === myCoord?.[0] - 1 ){
                if(!(destinationCoord[1] === myCoord?.[1] - 1 || destinationCoord[1] === myCoord?.[1])){
                    return;
                }
            }
            if(destinationCoord[0] === myCoord[0] + 1){
                if(!(destinationCoord[1] === myCoord?.[1] + 1 || destinationCoord[1] === myCoord?.[1])){
                    return;
                }
            }
            if(destinationCoord[0] === myCoord[0]){
                if(!(destinationCoord[1] === myCoord?.[1] + 1 || destinationCoord[1] === myCoord?.[1] - 1)){
                    return;
                }
            }
        }else if(myCoord[0] > 7){
            if(destinationCoord[0] === myCoord?.[0] - 1 ){
                if(!(destinationCoord[1] === myCoord?.[1] + 1 || destinationCoord[1] === myCoord?.[1])){
                    return;
                }
            }
            if(destinationCoord[0] === myCoord[0] + 1){
                if(!(destinationCoord[1] === myCoord?.[1] - 1 || destinationCoord[1] === myCoord?.[1])){
                    return;
                }
            }
            if(destinationCoord[0] === myCoord[0]){
                if(!(destinationCoord[1] === myCoord?.[1] + 1 || destinationCoord[1] === myCoord?.[1] - 1)){
                    return;
                }
            }
        }else{
            if(destinationCoord[0] === myCoord?.[0] - 1 || destinationCoord[0] === myCoord[0] + 1){
                if(!(destinationCoord[1] === myCoord?.[1] - 1 || destinationCoord[1] === myCoord?.[1])){
                    return;
                }
            }
            if(destinationCoord[0] === myCoord[0]){
                if(!(destinationCoord[1] === myCoord?.[1] - 1 || destinationCoord[1] === myCoord?.[1] + 1)){
                    return;
                }
            }
        }
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
        clearMapFromAvailableCells();
        await changePlayersLocation(user.id,destinationCoord);
        if(enemyId) await eliminatePlayer(match.id,enemyId);
        await nextTurn(match.id,user.id);
    }

    useEffect(() => {
        if(!match.id || !user.id) return;
        if(matchResult.players.length === maxPlayersNumber - 1 && !matchResult.players.some(player => player.player === user.id)){
            setIsWinner(true);
            addWinner(match.id,user.id);
            return; 
        }
        if(matchResult.players.some(player => player.place === 1 && player.player === user.id)){
            setIsWinner(true);
        }
        if(matchResult.players.some(player => player.player === user.id && player.place !== 1)){
            setIsEliminated(true);
        }
    },[matchResult.players,match.id,user.id]);

    useEffect(() => {
        if((isWinner || isEliminated) && user.id) clearPlayersMatchInfo(user.id);
    },[isWinner,isEliminated]);

    return {MapCoords,onStep,match,isEliminated,isWinner,matchResult};
}