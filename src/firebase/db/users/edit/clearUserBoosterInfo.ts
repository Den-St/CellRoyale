import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { updateDoc, doc } from 'firebase/firestore';
export const clearUserBoosterInfo = async (userId:string) => {
    try{
        await updateDoc(doc(db,collectionsKeys.users,userId),{
            activeBooster:'',
            boosterStepsRemaining:0
        })
    }catch(err){
        console.error(err);
    }
}