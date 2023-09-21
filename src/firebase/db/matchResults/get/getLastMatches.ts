import { MatchResultT } from './../../../../types/matchResult';
import { getDocs, limit } from 'firebase/firestore';
import { where } from 'firebase/firestore';
import { query } from 'firebase/firestore';
import { usersCollection } from '../../users/users.collection';
export const getLastMatches = async (userId:string) => {
    try{
        const q = query(usersCollection,where('players','array-contains',userId),limit(15));
        const docs = (await getDocs(q)).docs;
        const matchResults = docs.map(doc => doc.data());
        matchResults.forEach((matchResult,i) => {
            matchResult.id = docs[i].id;
        });

        return matchResults as MatchResultT[];
    }catch(err){    
        console.error(err);
    }
}