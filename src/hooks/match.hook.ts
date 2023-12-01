import { UserT } from './../types/user';
import { maxPlayersNumber } from './../consts/maxPlayersNumber';
import { limit } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { matchResultsCollection } from './../firebase/db/matchResults/matchResult.collection';
import { createMatchResult } from './../firebase/db/matchResults/create/createMatchResult';
import { addBoosters } from './../firebase/db/matches/edit/addBoosters';
import { useAppSelector, useAppDispacth } from './redux';
import { collectionsKeys } from './../firebase/db/collectionsKeys';
import {db} from "./../firebase/firebaseInit";
import { doc, onSnapshot, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadUser } from '../firebase/db/matches/edit/loadUser';
import { getUserById } from '../firebase/db/users/get/getUserById';
import { getBoosterById } from '../firebase/db/boosters/get/getBoosterById';
import { setMatch } from '../store/matchSlice';
import { setPlayerMatchInfo, setUser } from '../store/userSlice';
import { setMatchResult } from '../store/matchResultSlice';
import { MatchResultT } from '../types/matchResult';
import { setStepEndTime } from '../firebase/db/matches/edit/setStepEndTime';
import { setActivePlayer } from '../firebase/db/matches/edit/setActivePlayer';
import { giveUsersMatchInfo } from '../firebase/db/users/edit/giveUserMatchInfo';

export const useMatch = () => {
    const [boosters,setBoosters] = useState(false);
    const [loading,setLoading] = useState(false);
    const matchId = useParams().id;
    const user = useAppSelector(state => state.user);
    const match = useAppSelector(state => state.match);
    const dispatch = useAppDispacth();
    
    useEffect(() => {
        if(match.alivePlayers?.length === maxPlayersNumber && matchId && match.alivePlayers[0].id && !match.activePlayer) {
            // setLoading(true);
            setActivePlayer(matchId,match.alivePlayers[0].id);
            // setLoading(false);
        }
    },[match.alivePlayers?.length])

    useEffect(() => {
        if(!matchId || !user.id || match?.loadedPlayers?.includes(user.id) || match?.alivePlayers?.some(aliveUser => aliveUser.id === user.id)) return;
        // setLoading(true);
        loadUser(matchId,user.id);
        // setLoading(false);
    },[matchId,user.id,match.loadedPlayers]);

    useEffect(() => {
        if(match.loadedPlayers?.length !== maxPlayersNumber || !match.id || match.alivePlayers?.some(alivePlayer => alivePlayer?.location?.[0] || alivePlayer?.location?.[1])) return;
        giveUsersMatchInfo(match.id);
    },[match.loadedPlayers?.length,]);

    useEffect(() => {
        if(!matchId) return;
        if(match.loadedPlayers?.length !== maxPlayersNumber || match.stepEndTime) return;
        // setLoading(true);
        setStepEndTime(matchId);
        // setLoading(false);
    },[match.loadedPlayers]);

    useEffect(() => {
        if(boosters || !match?.id || match.boosters?.length || boosters || !user.id || match.creator !== user.id || (match?.roundNumber || 0) > 1) return;
        // setLoading(true);
        addBoosters(match?.id);
        setBoosters(true);
        createMatchResult(match.id);
        // setLoading(false);
    },[match,user.id]);

    useEffect(() => {
        setLoading(user.location?.[0] === undefined);
    },[user?.location?.[0],user?.location?.[1]]);

    useEffect(() => {
        if(!matchId || !user.id) return;
        if(user?.location?.[0] || user?.location?.[1]) return;
        const unsubscribe = onSnapshot(doc(db,collectionsKeys.users,user.id),async (doc) => {
            // setLoading(true);
            const user = doc.data();
            if(!user) return;

            user.id = doc.id;
            dispatch(setUser(user as UserT));
            // setLoading(false);
        });

        return () => unsubscribe();
    },[match.loadedPlayers]);

    useEffect(() => {
        if(!matchId) return;

        const unsubscribe = onSnapshot(doc(db,collectionsKeys.matches,matchId),async (doc) => {
            // setLoading(true);
            const match = doc.data();
            if(!match) return;
            match.activePlayer = await getUserById(match.activePlayer);
            const alivePlayersQ = match.alivePlayers.map(async (alivePlayer:string) => await getUserById(alivePlayer));
            match.alivePlayers = await Promise.all(alivePlayersQ);

            match.id = doc.id;
            dispatch(setMatch(match));
            // setLoading(false);
        });

        return () => unsubscribe();
    },[matchId]);

    useEffect(() => {
        if(!matchId) return;

        const unsubscribe = onSnapshot(query(matchResultsCollection,where('match','==',matchId),limit(1)),async (doc) => {
            if(!doc?.docs?.[0]) return;
            // setLoading(true);
            const matchResult = doc.docs[0].data();
            if(!matchResult) return;
            matchResult.id = doc.docs[0].id;

            dispatch(setMatchResult(matchResult as MatchResultT));
            // setLoading(false);
        });

        return () => unsubscribe();
    },[matchId]);

    return {loading}
}