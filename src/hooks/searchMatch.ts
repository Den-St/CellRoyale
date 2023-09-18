import { useEffect } from 'react';
import { useAppDispacth, useAppSelector } from './redux';
import { useState } from 'react';
import { searchMatch } from '../firebase/db/matches/get/searchMatch';
import { MatchT } from '../types/match';
import { doc, onSnapshot } from 'firebase/firestore';
import { collectionsKeys } from '../firebase/db/collectionsKeys';
import { db } from '../firebase/firebaseInit';
import { cancelSearch } from '../firebase/db/matches/edit/cancelSearch';
import { setMatch } from '../store/matchSlice';
import { maxPlayersNumber } from '../consts/maxPlayersNumber';

export const useSearchMatch = () => {
    const user = useAppSelector(state => state.user);
    const [matchId,setMatchId] = useState<string>('');
    const [localMatch,setLocalMatch] = useState<MatchT>();
    const [loading,setLoading] = useState(false);
    const [isSearchStarted,setIsSearchStarted] = useState(false);
    const [isSearchCanceled,setIsSearchCanceled] = useState(false);
    const [isMatchReady,setIsMatchReady] = useState(false);
    const dispatch = useAppDispacth();

    const onStartSearch = async () => {
        if(!user.id) return;
        setLoading(true);
        const foundMatch = await searchMatch(user.id);
        if(!foundMatch) return;
        setMatchId(foundMatch);
        setIsSearchCanceled(false);
        setLoading(false);
        setIsSearchStarted(true);
    }
    
    const onCancelSearch = async () => {
        if(!user.id) return;
        await cancelSearch(matchId,user.id);
        dispatch(setMatch({
            activePlayer:null,
            alivePlayers:[],
            boosters:[],
            id:'',
            loadedPlayers:[],
            numberOfPlayers:0,
            playersInQueue:[],
            roundNumber:0,
            creator:''
        }));
        setIsSearchStarted(false);
        setIsSearchCanceled(true);
    }
    
    useEffect(() => {
        dispatch(setMatch({
            activePlayer:null,
            alivePlayers:[],
            boosters:[],
            id:'',
            loadedPlayers:[],
            numberOfPlayers:0,
            playersInQueue:[],
            roundNumber:0,
            creator:''
        }));
    },[]);

    useEffect(() => {
        if(!isSearchStarted && user.matchQueue){
            setMatchId(user.matchQueue);
            setIsSearchCanceled(false);
            setIsSearchStarted(true);
        }
    },[user]);

    useEffect(() => {
        if(!isSearchStarted && !isSearchCanceled) return;
        const unsubscribe = onSnapshot(doc(db,collectionsKeys.matches,matchId),(doc) => {
            setLoading(true);
            const newMatch = {...doc.data(),id:doc.id};
            setLocalMatch(newMatch as MatchT);
            setLoading(false);
        });
        if(isSearchCanceled) unsubscribe();
        if(localMatch?.numberOfPlayers === maxPlayersNumber) {
            setIsSearchStarted(false);
            setIsMatchReady(true);
            return () => unsubscribe();
        }
    },[isSearchStarted,isSearchCanceled,localMatch?.numberOfPlayers]);

    return {onStartSearch,isSearchStarted,localMatch,matchId,loading,onCancelSearch,isMatchReady}
}