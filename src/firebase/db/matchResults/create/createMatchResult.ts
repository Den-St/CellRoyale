import { getDocs, limit, query, where } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { matchResultsCollection } from '../matchResult.collection';

export const createMatchResult = async (matchId:string) => {
    try{
        const q = query(matchResultsCollection,where('match',"==",matchId),limit(1));
        const matchResultDoc = await getDocs(q);
        const matchResult = matchResultDoc?.docs[0]?.data();
        if(matchResult) return;
        const matchResultId = (await addDoc(matchResultsCollection,{
            match:matchId,
            players:[],
            playersPlaces:[],
            createdAt:new Date()
        })).id;
        return matchResultId;
    }catch(err){
        console.error(err);
    }
}