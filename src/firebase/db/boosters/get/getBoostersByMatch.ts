import { BoosterT } from './../../../../types/booster';
import { boosterCollection } from './../boosterCollection';
import { query } from "@firebase/firestore";
import { where, getDocs } from 'firebase/firestore';

export const getBoostersByMatch = async (matchId:string) => {
    try{
        const q = query(boosterCollection,where('match', "==", matchId));
        const docs = (await getDocs(q)).docs;
        
        const boosters = docs.map(doc => doc.data());
        boosters.forEach((booster,i) => {
            booster.id = docs[i].id;
        })

        return boosters as BoosterT[];
    }catch(err){
        console.error(err);
    }
}