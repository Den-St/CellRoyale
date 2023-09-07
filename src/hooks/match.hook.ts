import { useAppSelector } from './redux';
import { collectionsKeys } from './../firebase/db/collectionsKeys';
import {db} from "./../firebase/firebaseInit";
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { MatchT } from './../types/match';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadUser } from '../firebase/db/matches/edit/loadUser';

export const useMatch = () => {
    const [match,setMatch] = useState<MatchT | null>(null);
    const [loading,setLoading] = useState(false);
    const matchId = useParams().id;
    const userId = useAppSelector(state => state.user.id);

    useEffect(() => {
        if(!matchId || !userId) return;
        loadUser(matchId,userId);
    },[matchId]);

    useEffect(() => {
        if(!matchId) return;
        const unsubscribe = onSnapshot(doc(db,collectionsKeys.matches,matchId),() => {
            // const match = 
        })
    },[matchId]);

    return {};
}