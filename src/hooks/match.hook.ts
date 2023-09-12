import { nextTurn } from './../firebase/db/matches/edit/nextTurn';
import { addBoosters } from './../firebase/db/matches/edit/addBoosters';
import { useAppSelector, useAppDispacth } from './redux';
import { collectionsKeys } from './../firebase/db/collectionsKeys';
import {db} from "./../firebase/firebaseInit";
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { MatchT } from './../types/match';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadUser } from '../firebase/db/matches/edit/loadUser';
import { getUserById } from '../firebase/db/users/get/getUserById';
import { getBoosterById } from '../firebase/db/boosters/get/getBoosterById';
import { setMatch } from '../store/matchSlice';

export const useMatch = () => {
    // const [match,setMatch] = useState<MatchT | null>(null);
    const [boosters,setBoosters] = useState(false);
    const [loading,setLoading] = useState(false);
    const matchId = useParams().id;
    const userId = useAppSelector(state => state.user.id);
    const match = useAppSelector(state => state.match);
    const dispatch = useAppDispacth();
    
    const onNextTurn = async () => {
        if(!userId || !matchId) return;
        await nextTurn(matchId,userId);
    }
    useEffect(() => {
        if(!matchId || !userId || match?.loadedPlayers?.includes(userId) || match?.alivePlayers?.some(user => user.id === userId)) return;
        loadUser(matchId,userId);
    },[matchId,userId,match]);

    useEffect(() => {
        if(boosters || !match?.id || match.boosters?.length || !userId || match.creator !== userId) return;
        addBoosters(match?.id);
        setBoosters(true);
    },[match,userId]);

    useEffect(() => {
        if(!matchId) return;

        const unsubscribe = onSnapshot(doc(db,collectionsKeys.matches,matchId),async (doc) => {
            const match = doc.data();
            if(!match) return;
            match.activePlayer = await getUserById(match.activePlayer);
            const alivePlayersQ = match.alivePlayers.map(async (alivePlayer:string) => await getUserById(alivePlayer));
            match.alivePlayers = await Promise.all(alivePlayersQ);

            const boostersQ = match.boosters.map(async (booster:string) => await getBoosterById(booster));
            match.boosters = await Promise.all(boostersQ);
            match.id = doc.id;
            console.log('match updated',match)
            
            dispatch(setMatch(match));
        });

    },[matchId]);

    return {match,onNextTurn};
}