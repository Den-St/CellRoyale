import { matchesCollection } from './../match.collection';
import { addDoc } from "firebase/firestore";
import { addMatchInQueue } from '../../users/edit/addMatchInQueue';

export const createMatch = async (userId:string) => {
    try{
        const match = await addDoc(matchesCollection,{
            activePlayer:'',
            alivePlayers:[],
            boosters:[],
            loadedPlayers:[],
            numberOfPlayers:1,
            playersInQueue:[userId],
            roundNumber:1,
            creator:userId
        });
        await addMatchInQueue(match.id,userId);
        return match;
    }catch(err){
        console.error(err);
    }
}