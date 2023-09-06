import { useEffect } from 'react';
import { useAppSelector } from './redux';
import { useState } from 'react';
import { searchMatch } from '../firebase/db/matches/get/searchMatch';
import { MatchT } from '../types/match';
import { doc, onSnapshot } from 'firebase/firestore';
import { collectionsKeys } from '../firebase/db/collectionsKeys';
import { db } from '../firebase/firebaseInit';

export const useSearchMatch = () => {
    const [match,setMatch] = useState<MatchT>();
    const [matchId,setMatchId] = useState<string>('');
    const [loading,setLoading] = useState(false);
    const [isSearchStarted,setIsSearchStarted] = useState(false);
    const userId = useAppSelector(state => state.user.id);

    const onStartSearch = async () => {
        if(!userId) return;
        setLoading(true)
        const foundMatch = await searchMatch(userId);
        setLoading(false);
        if(!foundMatch) return;
        setMatchId(foundMatch);
        setIsSearchStarted(true);
    }
    
    useEffect(() => {
        if(!isSearchStarted) return;
        const unsubscribe = onSnapshot(doc(db,collectionsKeys.matches,matchId),(doc) => {
            const match = {...doc.data(),id:doc.id};
            setMatch(match as MatchT);
        });
        if(match?.playersInQueue?.length === 4) {
            unsubscribe();
            setIsSearchStarted(false);
        }
    },[isSearchStarted]);

    return {onStartSearch,isSearchStarted,match,matchId,loading}
}