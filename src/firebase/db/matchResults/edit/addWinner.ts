import { updateDoc } from 'firebase/firestore';
import { getDoc } from 'firebase/firestore';
import { collectionsKeys } from '../../collectionsKeys';
import { db } from '../../../firebaseInit';
import { doc } from 'firebase/firestore';

export const addWinner = async (matchId:string,userId:string) => {
    try{
        const document = doc(db,collectionsKeys.matchResults,matchId);
        const matchResultDoc = await getDoc(document);
        const matchResult = matchResultDoc.data();
        if(!matchResult) return;
        if(matchResult.players.includes(userId)) return;

        await updateDoc(document,{
            players:[{player:userId,place:1}, ...matchResult[0]?.data()?.players]
        });
    }catch(err){
        console.error(err);
    }
}