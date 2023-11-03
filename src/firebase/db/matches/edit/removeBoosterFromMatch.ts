import { BoosterT } from './../../../../types/booster';
import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
export const removeBoosterFromMatch = async (matchId:string,boosterId:string) => {
    try{    
        const matchDoc = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(matchDoc)).data();
        const filteredBoosters = match?.boosters.filter((booster:BoosterT) => booster.id !== boosterId);
        
        await updateDoc(matchDoc,{
            boosters: filteredBoosters
        });
    }catch(err){
        console.error(err);
    }
}