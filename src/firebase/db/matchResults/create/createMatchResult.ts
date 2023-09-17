import { addDoc } from 'firebase/firestore';
import { maxPlayersNumber } from '../../../../consts/maxPlayersNumber';
import { matchResultsCollection } from '../matchResult.collection';

export const createMatchResult = async (matchId:string,userId:string) => {
    try{
        return await addDoc(matchResultsCollection,{
            match:matchId,
            players:[{player:userId,place:maxPlayersNumber}]
        });
    }catch(err){
        console.error(err);
    }
}