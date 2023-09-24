import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
export const removeBoosterFromMatch = async (matchId:string,boosterId:string) => {
    try{    
        const matchDoc = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(matchDoc)).data();
        await updateDoc(matchDoc,{
            boosters:match?.boosters.filter((booster:string) => booster !== boosterId)
        });
    }catch(err){
        console.error(err);
    }
}