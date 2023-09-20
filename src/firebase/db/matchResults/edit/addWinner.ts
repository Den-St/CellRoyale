import { getDoc } from 'firebase/firestore';
import { where,limit,updateDoc,getDocs,doc } from 'firebase/firestore';
import { collectionsKeys } from '../../collectionsKeys';
import { db } from '../../../firebaseInit';
import { query } from "@firebase/firestore";

import { matchResultsCollection } from '../matchResult.collection';

export const addWinner = async (matchId:string,userId:string) => {
    try{
        console.log('vhvhvh')
        const q = query(matchResultsCollection,where('match',"==",matchId),limit(1));
        const matchResultDoc = await getDocs(q);
        const matchResult = matchResultDoc.docs[0].data();
        if(!matchResult) return;
        if(matchResult.players.includes(userId)) return;

        await updateDoc(doc(db,collectionsKeys.matchResults,matchResultDoc.docs[0].id),{
            players:[{player:userId,place:1}, ...matchResult?.players]
        });
        const userDoc = doc(db,collectionsKeys.users,userId);
        const user = (await getDoc(userDoc)).data();
        if(!user) return;
        await updateDoc(userDoc,{
            rating:user.rating + 10
        });

        return user.rating + 10;
    }catch(err){
        console.error(err);
    }
}