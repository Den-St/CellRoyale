import { MatchResultT } from './../../../../types/matchResult';
import { getDocs, limit } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { matchResultsCollection } from '../matchResult.collection';
export const getLastMatches = async (userId:string) => {
    try{
        const q = query(matchResultsCollection,where('players','array-contains',userId),limit(15));
        const docs = (await getDocs(q)).docs;
        const matchResults = docs.map(doc => doc.data());
        matchResults.forEach((matchResult,i) => {
            matchResult.id = docs[i].id;
        }); console.log('g',matchResults)

        return matchResults as MatchResultT[];
    }catch(err){    
        console.error(err);
    }
}