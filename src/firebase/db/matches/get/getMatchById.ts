import { collectionsKeys } from './../../collectionsKeys';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseInit';
import { getUserById } from '../../users/get/getUserById';
export const getMatchById = async (matchId:string) => {
    try{
        const document = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(document)).data();
        if(!match) return;
        
        match.activePlayer = await getUserById(match.activePlayer);
        const activePlayersQ = match.activePlayers.map(async (activePlayer:string) => await getUserById(activePlayer));
        const activePlayers = await Promise.all(activePlayersQ);

        const boostersQ = match.boosters.map(async (activePlayer:string) => await getUserById(activePlayer));

    }catch(err){
        console.error(err);
    }
}