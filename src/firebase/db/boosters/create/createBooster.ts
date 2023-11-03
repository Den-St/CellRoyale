import { boosterCollection } from './../boosterCollection';
import { addDoc } from 'firebase/firestore';
import { BoosterT, CreateBoosterT } from "../../../../types/booster";

export const createBooster = async (data:CreateBoosterT) => {
    try{
        const booster = await addDoc(boosterCollection,data);
        console.log(booster)
        return {id:booster.id,type:data.type,location:data.location} as BoosterT;
    }catch(err){
        console.error(err);
    }
}