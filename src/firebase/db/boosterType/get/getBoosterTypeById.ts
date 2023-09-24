import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { doc, getDoc } from 'firebase/firestore';
import { BoosterTypeT } from '../../../../types/boosterType';

export const getBoosterTypeById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.boosterTypes,id);
        const boosterTypeDoc = await getDoc(document);
        const boosterType = boosterTypeDoc.data();
        if(!boosterType) return;

        boosterType.id = boosterTypeDoc.id;

        return boosterType as BoosterTypeT;
    }catch(err){
        console.error(err);
    }
}