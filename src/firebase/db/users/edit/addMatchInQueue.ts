import { updateDoc } from 'firebase/firestore';
import { collectionsKeys } from './../../collectionsKeys';
import { doc } from 'firebase/firestore';
import { db } from '../../../firebaseInit';

export const addMatchInQueue = async (matchId:string,userId:string) => {
    try{
        const document = doc(db,collectionsKeys.users,userId);

        await updateDoc(document,{
            matchQueue:matchId
        })
    }catch(err){
        console.error(err);
    }
}