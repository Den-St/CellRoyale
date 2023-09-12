import { collectionsKeys } from './../../collectionsKeys';
import { doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';
import { BoosterTypeT } from './../../../../types/boosterType';
import { boostersLocations } from './../../../../consts/boostersLocations';
import { getAllBoosterTypes } from "../../boosterType/get/getAllBoosterTypes";
import { createBooster } from '../../boosters/create/createBooster';
import { db } from '../../../firebaseInit';

export const addBoosters = async (matchId:string) => {
    function shuffle(array:BoosterTypeT[]) {
        array.sort(() => Math.random() - 0.5);
    }
    try{
        const boosterTypes = await getAllBoosterTypes();
        if(!boosterTypes) return;
        shuffle(boosterTypes);

        const boostersQ = boostersLocations.map(async (boostersLocation,i) => {
            return await createBooster({
                location:boostersLocation,
                type:boosterTypes[i].id,
            });
        });
        const boosters = await Promise.all(boostersQ);

        await updateDoc(doc(db,collectionsKeys.matches,matchId),{
            boosters
        });
    }catch(err){
        console.error(err);
    }
}