import { MatchResultT } from './../../../../types/matchResult';
import { getDoc } from 'firebase/firestore';
import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { doc } from 'firebase/firestore';
export const getMatchResult = async (matchId:string) => {
    try{
        const document = doc(db,collectionsKeys.matchResults,matchId);
        const matchResultDoc = await getDoc(document);
        const matchResult = matchResultDoc.data();
        if(!matchResult) return;

        matchResult.id = matchResultDoc.id;
        return matchResult as MatchResultT;
    }catch(err){
        console.error(err);
    }
}