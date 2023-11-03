import { getDoc } from 'firebase/firestore';
import { collectionsKeys } from './../../collectionsKeys';
import { doc } from 'firebase/firestore';
import { db } from '../../../firebaseInit';
import { getBoosterTypeById } from '../../boosterType/get/getBoosterTypeById';
import { BoosterT } from '../../../../types/booster';

export const getBoosterById = async (id:string) => {
    try{
        const document = doc(db,collectionsKeys.boosters,id);
        const boosterDoc = (await getDoc(document));
        const booster = boosterDoc.data();
        if(!booster) return;
        // const boosterType = await getBoosterTypeById(booster.type);
        // booster.type = boosterType;
        booster.id = boosterDoc.id;
        
        return booster as BoosterT;
    }catch(err){
        console.error();
    }
}