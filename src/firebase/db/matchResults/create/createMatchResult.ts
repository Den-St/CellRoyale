import { getDocs, limit, query, where } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { maxPlayersNumber } from '../../../../consts/maxPlayersNumber';
import { matchResultsCollection } from '../matchResult.collection';

// export const createMatchResult = async (matchId:string,userId:string) => {
//     try{
//         return await addDoc(matchResultsCollection,{
//             match:matchId,
//             players:[{player:userId,place:maxPlayersNumber}]
//         });
//     }catch(err){
//         console.error(err);
//     }
// }

export const createMatchResult = async (matchId:string) => {
    try{
        const q = query(matchResultsCollection,where('match',"==",matchId),limit(1));
        const matchResultDoc = await getDocs(q);
        const matchResult = matchResultDoc?.docs[0]?.data();
        if(matchResult) return;
        const matchResultId = (await addDoc(matchResultsCollection,{
            match:matchId,
            players:[],
            playersPlaces:[]
        })).id;
        return matchResultId;
    }catch(err){
        console.error(err);
    }
}