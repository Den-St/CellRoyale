import { boostersTypesNames } from './../consts/boostersTypesNames';
import { clearUserBoosterInfo } from './../firebase/db/users/edit/clearUserBoosterInfo';
import { removeBoosterById } from './../firebase/db/boosters/delete/removeBoosterById';
import { eliminatePlayer } from '../firebase/db/matches/edit/eliminatePlayer';
import { UserT } from './../types/user';
import { changePlayersLocation } from './../firebase/db/users/edit/changeLocation';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { nextTurn } from './../firebase/db/matches/edit/nextTurn';
import { useAppSelector, useAppDispacth } from './redux';
import { MapT } from '../types/map';
import { addWinner } from '../firebase/db/matchResults/edit/addWinner';
import { clearPlayersMatchInfo } from '../firebase/db/users/edit/clearPlayersMatchInfo';
import { maxPlayersNumber } from '../consts/maxPlayersNumber';
import { BoosterT } from '../types/booster';
import { activateBooster } from '../firebase/db/users/edit/activateBooster';
import { removeBoosterFromMatch } from '../firebase/db/matches/edit/removeBoosterFromMatch';
import { clearUserBooster, decrementBoosterStepsRemainingLocally, setNewBooster, setUserLocation } from '../store/userSlice';
import { decreaseBoosterStepsRemaining } from '../firebase/db/users/edit/decreaseBoosterStepsRemaining';
import { isAvailableCell } from '../helpers/isAvailableCell';

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
    const dispatch = useAppDispacth();
   
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
                    if(user.location && i - 1 === user.location[0] && +y === user.location[1]){
                        if(user.id){
                            setIsEliminated(true);
                            eliminatePlayer(match.id,user.id)
                        }
                    }
                    newMap[i - 1][+y] = {type:'cell',value:2};
                });
                Object.keys(newMap[15 - i]).forEach(y => {
                    if(user.location && 15 - i === user.location[0] && +y === user.location[1]){
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
                            if(user.location && +x === user.location[0] && +y === user.location[1]){
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
        // displayZoneCells();
        displayAlivePlayers();
        displayBoosters();
        setAvailableCells();
    }
    const setAvailableCells = () => {
        if(isWinner || isEliminated) return;
        if(match?.activePlayer?.id !== user.id) return;
        if(!user.location) return;

        setMapCoords(prev => {
            const newMap:MapT = prev;

            Object.keys(prev).forEach(
                x => Object.keys(prev[+x]).forEach(y => {
                    if(newMap[+x][+y].type !== 'player' && newMap[+x][+y].type !== 'booster' && user.location){
                        const stepRange = user?.activeBooster?.name === boostersTypesNames.increaseStepDistance ? 2 : 1
                        if(isAvailableCell(user.location,[+x,+y],stepRange,7)) newMap[+x][+y] = {type:'cell',value:1};
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
        if(!user.location) return;
        if(!match.id || !user.id) return;
        if(match?.activePlayer?.id !== user.id) return;
        
        if(destinationCoord[0] === user.location[0]) return;
        let enemyId = MapCoords[destinationCoord[0]][destinationCoord[1]].type === 'player' ? (MapCoords[destinationCoord[0]][destinationCoord[1]].value as UserT).id : null;
        let booster = MapCoords[destinationCoord[0]][destinationCoord[1]].type === 'booster' ? (MapCoords[destinationCoord[0]][destinationCoord[1]].value as BoosterT) : null;
        
        const stepRange = user?.activeBooster?.name === boostersTypesNames.increaseStepDistance ? 2 : 1
        if(!isAvailableCell(user.location,destinationCoord,stepRange,7)) return;

        setMapCoords(prev => {
            const x = destinationCoord[0];
            const y = destinationCoord[1];

            return ({...prev,[x]:{...prev[x], [y]: {type:'player',value:user}},
            });
        });

        setMapCoords(prev => {
            const x = user.location?.[0];
            const y = user.location?.[1]; 

            if(!x || !y) return prev;
            return ({...prev,[x]:{...prev[x], [y]:{type:'cell',value:0}}});
        });
        //if(user.boosterStep) await decreaseSteps dispatch(decrement); if boosterStep === 1 set '' to activeBooster and decrement
        //if(booster) await activateBooster(user.id,booster.type); set boosterSteps and set booster.type.id in activeBooster
        //if(booster) deleteBooster(booster.id) remove from map and delete doc
        dispatch(setUserLocation({location:destinationCoord}));
        clearMapFromAvailableCells();
        const queries = [];
        queries.push(async () => user.id && await changePlayersLocation(user.id,destinationCoord));
        if(booster) {
            queries.push(async () => user.id && booster?.type && await activateBooster(user.id,booster?.type));
            queries.push(async () => user.id && booster && await removeBoosterById(booster.id));
            queries.push(async () => user.id && match.id && booster && await removeBoosterFromMatch(match.id,booster.id));
        }
        if(user.boosterStepsRemaining){
            queries.push(async () => user.id && await decreaseBoosterStepsRemaining(user.id));
        }
        if(enemyId) queries.push(async () => enemyId && await eliminatePlayer(match.id,enemyId));
        await Promise.all(queries.map(q => q()));
        if(booster) {
            dispatch(setNewBooster({boosterType:booster.type}));
        }
        if(user.boosterStepsRemaining){
            dispatch(decrementBoosterStepsRemainingLocally());
        }
        if(user.boosterStepsRemaining === 1) dispatch(clearUserBooster());
        await nextTurn(match.id,user.id);
    }

    useEffect(() => {
        if(!match.id || !user.id) return;
        if(matchResult.playersPlaces.length === maxPlayersNumber - 1 && !matchResult.playersPlaces.some(player => player.player === user.id)){
            setIsWinner(true);
            addWinner(match.id,user.id);
            return; 
        }
        if(matchResult.playersPlaces.some(player => player.place === 1 && player.player === user.id)){
            setIsWinner(true);
        }
        if(matchResult.playersPlaces.some(player => player.player === user.id && player.place !== 1)){
            setIsEliminated(true);
        }
    },[matchResult.playersPlaces,match.id,user.id]);

    useEffect(() => {
        if((isWinner || isEliminated) && user.id) clearPlayersMatchInfo(user.id);
    },[isWinner,isEliminated]);

    return {MapCoords,onStep,match,isEliminated,isWinner,matchResult};
}