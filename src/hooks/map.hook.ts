import { getMatchById } from './../firebase/db/matches/get/getMatchById';
import { MatchT } from './../types/match';
import { createMessage } from './../firebase/db/messages/create/createMessage';
import { boostersTypesNames } from './../consts/boostersTypesNames';
import { removeBoosterById } from './../firebase/db/boosters/delete/removeBoosterById';
import { eliminatePlayer } from '../firebase/db/matches/edit/eliminatePlayer';
import { UserT } from './../types/user';
import { changePlayersLocation } from './../firebase/db/users/edit/changeLocation';
import { useCallback, useEffect } from 'react';
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
import { boostersAvailableCellsFunctions } from '../helpers/isAvailableCell';
import _debounce from 'lodash/debounce';
import { setMatch } from '../store/matchSlice';

export const useMap = () => {
    const createMap = () => {
        const map:MapT = {}
        const mapSize = 19;//19
        const mapCenter = Math.ceil(mapSize/2);
        let rowSize;
        //Math.ceil(Object.keys(MapCoords).length/2);
        for(let i = 0;i < mapSize;i++){
            map[i] = {};
            rowSize = i < mapCenter ? mapCenter + i : mapSize - (i - mapCenter + 1);
            for(let j = 0;j < rowSize;j++){
                map[i][j] = {isAvailable:false,type:'cell',value:0};
            }
        }
        return map;
    }
    const [MapCoords,setMapCoords] = useState<MapT>(createMap());

    const [isEliminated,setIsEliminated] = useState(false);
    const [isWinner,setIsWinner] = useState(false);
    const [isOnStep,setIsOnStep] = useState(false);
    const user = useAppSelector(state => state.user);
    const match = useAppSelector(state => state.match);
    const [isActive,setIsActive] = useState(match?.activePlayer?.id === user?.id);
    const matchResult = useAppSelector(state => state.matchResult);
    const dispatch = useAppDispacth();
    const mapCenter = Math.ceil(Object.keys(MapCoords).length/2);
    // console.log('MapCoords',MapCoords);
    const clearMap = () => {
        setMapCoords(prev => {
            const clearedMap:MapT = prev;

            Object.keys(prev).forEach(
                x => Object.keys(prev[+x]).forEach(y => {
                    if(clearedMap[+x][+y].type === 'player' || clearedMap[+x][+y].type === 'booster' || clearedMap[+x][+y].value === 1){
                        clearedMap[+x][+y] = {type:'cell',value:0,isAvailable:false};
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
                    if( clearedMap[+x][+y].isAvailable){
                        clearedMap[+x][+y] = {...clearedMap[+x][+y],isAvailable:false};
                    }
                }));
                
                return clearedMap;
        });
    }
    const displayZoneCells = () => {
        const mapSize = Object.keys(MapCoords).length;

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
                            createMessage({
                                sender:user.id,
                                match:match.id || '',
                                isSystem:true,
                                text:user.displayName + ' eliminated by zone'
                            });
                        }
                    }
                    newMap[i - 1][+y] = {type:'cell',value:2,isAvailable:false};
                });
                Object.keys(newMap[mapSize - i]).forEach(y => {
                    if(user.location && mapSize - i === user.location[0] && +y === user.location[1]){
                        if(user.id){
                            setIsEliminated(true);
                            eliminatePlayer(match.id,user.id);
                            createMessage({
                                sender:user.id,
                                match:match.id || '',
                                isSystem:true,
                                text:user.displayName + ' eliminated by zone'
                            });
                        }
                    } 
                    newMap[mapSize - i][+y] = {type:'cell',value:2,isAvailable:false};
                });
                Object.keys(newMap).forEach(
                    x => Object.keys(newMap[+x]).forEach(y => {
                        if(match.roundNumber !== undefined && (+y < match.roundNumber - 1 || +y > Object.keys(newMap[+x]).length - match.roundNumber)){
                            if(user.location && +x === user.location[0] && +y === user.location[1]){
                                if(user.id) {
                                    setIsEliminated(true);
                                    eliminatePlayer(match.id,user.id);
                                    createMessage({
                                        sender:user.id,
                                        match:match.id || '',
                                        isSystem:true,
                                        text:user.displayName + ' eliminated by zone'
                                    });
                                }
                            }
                            newMap[+x][+y] = {type:'cell',value:2,isAvailable:false};
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

            return ({...prev,[x]:{...prev[x], [y]: {...prev[x][y],type:'player',value:player}}});
        }));
    }
    const displayBoosters = () => {
        match?.boosters?.forEach(booster => setMapCoords(prev => {
            const x = booster?.location?.[0];
            const y = booster?.location?.[1];
            if(!x || !y) return prev;

            return ({...prev,[x]:{...prev[x], [y]: {...prev[x][y],type:'booster',value:booster}}});
        }));
    }
    const loadMap = () => {
        if(!match) return;

        clearMap();
        // displayZoneCells();
        displayAlivePlayers();
        // displayBoosters();
        setAvailableCells();
    }
    const setAvailableCells = (isCurrentActive?:boolean) => {
        if(isWinner || isEliminated) return;
        if(!isActive && !isCurrentActive) return;
        if(!user.location) return;

        setMapCoords(prev => {
            const newMap:MapT = prev;

            Object.keys(prev).forEach(
                x => Object.keys(prev[+x]).forEach(y => {
                    if(user.location){
                        // const stepRange = user?.activeBooster?.name === boostersTypesNames.increaseStepDistance ? 2 : 1
                        // if(isAvailableCell(user.location,[+x,+y],stepRange,mapCenter - 1)) newMap[+x][+y] = {...newMap[+x][+y],isAvailable:true};
                        if(user?.activeBooster?.name && user?.activeBooster?.name !== boostersTypesNames.invisibility){
                            if(boostersAvailableCellsFunctions[user?.activeBooster?.name]?.(user.location,[+x,+y],mapCenter - 1)) {
                                newMap[+x][+y] = {...newMap[+x][+y],isAvailable:true};
                            }
                        }else{
                            if(isAvailableCell(user.location,[+x,+y],1,mapCenter - 1)){
                                newMap[+x][+y] = {...newMap[+x][+y],isAvailable:true};
                            }
                        }
                    }
                }));

                return newMap;
        });
    };
    useEffect(() => {
        loadMap();
    },[match,]);
    
    useEffect(() => {
        setIsActive(match.activePlayer?.id === user.id);
        if(!isActive || match.activePlayer?.id !== user.id){
            clearMapFromAvailableCells();
        }
        setAvailableCells(match.activePlayer?.id === user.id);
    },[match.activePlayer?.id]);

    const makeUserNotActiveAtClient = () => setIsActive(false);
    
    const onStep = async (destinationCoord:number[]) => {
        if(isOnStep) return;
        if(isEliminated || isWinner) return;
        if(!user.location) return;
        if(!match.id || !user.id) return;
        if(!isActive) return;
        if(destinationCoord[0] === user.location[0] && destinationCoord[1] === user.location[1]) return;

        // const stepRange = user?.activeBooster?.name === boostersTypesNames.increaseStepDistance ? 2 : 1;
        // if(user?.activeBooster?.name && user?.activeBooster?.name !== boostersTypesNames.invisibility){
        //     if(!boostersAvailableCellsFunctions[user?.activeBooster?.name]?.(user.location,destinationCoord,mapCenter)) return;
        // }else{
            if(!isAvailableCell(user.location,destinationCoord,1,mapCenter - 1)) return;
        // }
        
        setIsOnStep(true);

        let enemyId = MapCoords[destinationCoord[0]][destinationCoord[1]].type === 'player' ? (MapCoords[destinationCoord[0]][destinationCoord[1]].value as UserT).id : null;
        let enemyName = MapCoords[destinationCoord[0]][destinationCoord[1]].type === 'player' ? (MapCoords[destinationCoord[0]][destinationCoord[1]].value as UserT).displayName : null;
        let booster = MapCoords[destinationCoord[0]][destinationCoord[1]].type === 'booster' ? (MapCoords[destinationCoord[0]][destinationCoord[1]].value as BoosterT) : null;
        
        clearMapFromAvailableCells();
        setMapCoords(prev => {
            const x = destinationCoord[0];
            const y = destinationCoord[1];

            return ({...prev,[x]:{...prev[x], [y]: {...prev[x][y],type:'player',value:user}},});
        });

        setMapCoords(prev => {
            const x = user.location?.[0];
            const y = user.location?.[1]; 

            if(!x || !y) return prev;
            return ({...prev,[x]:{...prev[x], [y]:{...prev[x][y],type:'cell',value:0}}});
        });

        dispatch(setUserLocation({location:destinationCoord}));
        //change active player on client
        makeUserNotActiveAtClient();

        const queries = [];
        queries.push(async () => user.id && await changePlayersLocation(user.id,destinationCoord));
        // if(user.boosterStepsRemaining){
        //     queries.push(async () => user.id && await decreaseBoosterStepsRemaining(user.id));
        // }
        // if(booster) {
        //     queries.push(async () => user.id && booster?.type && await activateBooster(user.id,booster?.type));
        //     // queries.push(async () => user.id && match.id && booster && 
        // await removeBoosterFromMatch(match.id,booster.id)
        //     // );
        //     queries.push(async () => user.id && booster && await removeBoosterById(booster.id));
        // } 
        // else if(enemyId) queries.push(async () => enemyId && await eliminatePlayer(match.id,enemyId));

        await Promise.all(queries.map(q => q()));

        // if(booster) {
        //     dispatch(setNewBooster({boosterType:booster.type}));
        // }
        // if(user.boosterStepsRemaining){
        //     dispatch(decrementBoosterStepsRemainingLocally());
        // }
        // if(user.boosterStepsRemaining === 1) dispatch(clearUserBooster());
        await nextTurn(match.id,user.id);
        
        // if(booster){
        //     createMessage({
        //         sender:user.id,
        //         match:match.id,
        //         isSystem:true,
        //         text:user.displayName + ' activated ' + booster.type.name
        //     });
        // }
        // if(enemyName){
        //     createMessage({
        //         sender:user.id,
        //         match:match.id,
        //         isSystem:true,
        //         text:user.displayName + ' eliminated ' + enemyName
        //     });
        // }
        setIsOnStep(false);
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

    return {MapCoords,onStep,match,isEliminated,isWinner,matchResult,user,clearMapFromAvailableCells,mapCenter,isOnStep, makeUserNotActiveAtClient,};
}