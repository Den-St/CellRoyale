import { placeToRating } from './../../../../consts/placeToRating';
import { getDoc } from 'firebase/firestore';
import { where,limit,updateDoc,getDocs,doc } from 'firebase/firestore';
import { collectionsKeys } from '../../collectionsKeys';
import { db } from '../../../firebaseInit';
import { query } from "@firebase/firestore";
import { matchResultsCollection } from '../matchResult.collection';

export const addWinner = async (matchId:string,userId:string) => {
    try{
        const q = query(matchResultsCollection,where('match',"==",matchId),limit(1));
        const matchResultDoc = await getDocs(q);
        const matchResult = matchResultDoc.docs[0].data();
        if(!matchResult) return;
        if(matchResult.playersPlaces.includes(userId)) return;

        await updateDoc(doc(db,collectionsKeys.matchResults,matchResultDoc.docs[0].id),{
            playersPlaces:[{player:userId,place:1}, ...matchResult?.playersPlaces],
            players:[...matchResult.players,userId]
        });
        const userDoc = doc(db,collectionsKeys.users,userId);
        const matchDoc = doc(db,collectionsKeys.matches,matchId);
        const user = (await getDoc(userDoc)).data();
        if(!user) return;
        await Promise.all([
            await updateDoc(userDoc,{
                rating:user.rating + placeToRating[1],
                numberOfWins:user.numberOfWins + 1,
            }),
            await updateDoc(matchDoc,{
                isEnded:true
            }),
        ])
        

        return user.rating + placeToRating[1];
    }catch(err){
        console.error(err);
    }
}