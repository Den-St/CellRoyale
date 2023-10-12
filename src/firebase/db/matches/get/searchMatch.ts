import { maxPlayersNumber } from './../../../../consts/maxPlayersNumber';
import { matchesCollection } from '../match.collection';
import { query, where, getDocs, limit } from "firebase/firestore";
import { addUserInQueue } from '../edit/addUserInQueue';
import { createMatch } from '../create/createMatch';

export const searchMatch = async (userId:string) => {
    try{
        const q = query(matchesCollection,where('numberOfPlayers', "!=", maxPlayersNumber),limit(1));
        const docs = await getDocs(q);
        const matchDoc = docs.docs[0];
        if(matchDoc){
            await addUserInQueue(matchDoc.id,userId);
            return matchDoc.id;
        }else{
            const createdMatch =  await createMatch(userId);
            return createdMatch?.id;
        }
    }catch(err){
        console.error(err);
    }
}