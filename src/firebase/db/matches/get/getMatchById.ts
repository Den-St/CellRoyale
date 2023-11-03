import { MatchT } from './../../../../types/match';
import { collectionsKeys } from './../../collectionsKeys';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseInit';
import { getUserById } from '../../users/get/getUserById';
import { getBoosterById } from '../../boosters/get/getBoosterById';

export const getMatchById = async (matchId:string) => {
    try{
        const document = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(document)).data();
        if(!match) return;
        
        match.activePlayer = await getUserById(match.activePlayer);
        const alivePlayersQ = match.alivePlayers.map(async (alivePlayer:string) => await getUserById(alivePlayer));
        match.alivePlayers = await Promise.all(alivePlayersQ);

        return match as MatchT;
    }catch(err){
        console.error(err);
    }
}