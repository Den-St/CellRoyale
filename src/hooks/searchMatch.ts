import { useEffect } from 'react';
import { useAppSelector } from './redux';
import { useState } from 'react';
import { searchMatch } from '../firebase/db/matches/get/searchMatch';
import { MatchT } from '../types/match';
import { doc, onSnapshot } from 'firebase/firestore';
import { collectionsKeys } from '../firebase/db/collectionsKeys';
import { db } from '../firebase/firebaseInit';
import { cancelSearch } from '../firebase/db/matches/edit/cancelSearch';

export const useSearchMatch = () => {
    const [match,setMatch] = useState<MatchT | null>();
    const [matchId,setMatchId] = useState<string>('');
    const [loading,setLoading] = useState(false);
    const [isSearchStarted,setIsSearchStarted] = useState(false);
    const [isSearchCanceled,setIsSearchCanceled] = useState(false);
    const [isMatchReady,setIsMatchReady] = useState(false);
    const user = useAppSelector(state => state.user);

    const onStartSearch = async () => {
        if(!user.id) return;
        setLoading(true)
        const foundMatch = await searchMatch(user.id);
        setLoading(false);
        if(!foundMatch) return;
        setMatchId(foundMatch);
        setIsSearchCanceled(false);
        setIsSearchStarted(true);
    }
    
    const onCancelSearch = async () => {
        if(!user.id) return;
        await cancelSearch(matchId,user.id);
        setMatch(null);
        setIsSearchStarted(false);
        setIsSearchCanceled(true);
    }
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
            const match = {...doc.data(),id:doc.id};
            setMatch(match as MatchT);
        });
        if(isSearchCanceled) unsubscribe();
        if(match?.numberOfPlayers === 2) {
            console.log(',')
            setIsSearchStarted(false);
            setIsMatchReady(true);
            return () => unsubscribe();
        }
    },[isSearchStarted,isSearchCanceled,match?.numberOfPlayers]);

    return {onStartSearch,isSearchStarted,match,matchId,loading,onCancelSearch,isMatchReady}
}