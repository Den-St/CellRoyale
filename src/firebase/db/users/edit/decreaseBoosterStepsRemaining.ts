import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
export const decreaseBoosterStepsRemaining = async (userId:string) => {
    try{
        const userDoc = doc(db,collectionsKeys.users,userId);
        const user = (await getDoc(userDoc)).data();
        await updateDoc(userDoc,{
            boosterStepsRemaining:user?.boosterStepsRemaining - 1,
            activeBooster:user?.boosterStepsRemaining !== 1 ? user?.activeBooster : ''
        });
    }catch(err){
        console.error(err);
    }
}