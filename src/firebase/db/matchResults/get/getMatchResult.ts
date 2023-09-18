import { MatchResultT } from './../../../../types/matchResult';
import { getDocs, limit, query, where } from 'firebase/firestore';
import { matchResultsCollection } from '../matchResult.collection';

export const getMatchResult = async (matchId:string) => {
    try{
        const q = query(matchResultsCollection,where('match',"==",matchId),limit(1));
        const matchResultDoc = await getDocs(q);
        const matchResult = matchResultDoc.docs[0].data();
        if(!matchResult) return;

        matchResult.id = matchResultDoc.docs[0].id;
        return matchResult as MatchResultT;
    }catch(err){
        console.error(err);
    }
}