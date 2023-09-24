import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { doc, updateDoc } from 'firebase/firestore';
import { BoosterTypeT } from './../../../../types/boosterType';
export const activateBooster = async (userId:string,boosterType:BoosterTypeT) => {
    try{
        const userDoc = doc(db,collectionsKeys.users,userId);
        await updateDoc(userDoc,{
            activeBooster:boosterType.id,
            boosterStepsRemaining:boosterType.duration
        });
    }catch(err){
        console.error(err);
    }
}