import { boosterCollection } from './../boosterCollection';
import { addDoc } from 'firebase/firestore';
import { CreateBoosterT } from "../../../../types/booster";

export const createBooster = async (data:CreateBoosterT) => {
    try{
        return (await addDoc(boosterCollection,data)).id;
    }catch(err){
        console.error(err);
    }
}