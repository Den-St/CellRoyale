import { BoosterTypeT } from './../../../../types/boosterType';
import { boosterTypeCollection } from './../boosterCollection';
import { getDocs } from "firebase/firestore";

export const getAllBoosterTypes = async () => {
    try{
        const docs = await getDocs(boosterTypeCollection);
        const boosterTypesDocs = docs.docs;
        const boosterTypes = boosterTypesDocs.map(type => type.data());
        boosterTypes.forEach((type,i) => type.id = boosterTypesDocs[i].id);

        return boosterTypes as BoosterTypeT[];
    }catch(err){
        console.error(err);
    }
}