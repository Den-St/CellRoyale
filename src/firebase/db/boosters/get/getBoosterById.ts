import { getDoc } from 'firebase/firestore';
import { collectionsKeys } from './../../collectionsKeys';
import { doc } from 'firebase/firestore';
import { db } from '../../../firebaseInit';
export const getBoosterById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.boosters,id);
        const booster = (await getDoc(document));
        
        return {...booster.data(),id:booster.id};
    }catch(err){
        console.error();
    }
}