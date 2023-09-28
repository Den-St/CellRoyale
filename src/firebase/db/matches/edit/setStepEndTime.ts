import { stepTimeWithFault } from './../../../../consts/stepTime';
import { updateDoc } from 'firebase/firestore';
import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { doc } from 'firebase/firestore';
export const setStepEndTime = async (matchId:string) => {
    try{
        const document = doc(db,collectionsKeys.matches,matchId);
        await updateDoc(document,{
            stepEndTime:(new Date().getTime()/1000) + stepTimeWithFault
        });        
    }catch(err){
        console.error(err);
    }
}