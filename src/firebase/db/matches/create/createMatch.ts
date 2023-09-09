import { matchesCollection } from './../match.collection';
import { addDoc } from "firebase/firestore";

export const createMatch = async (userId:string) => {
    try{
        return await addDoc(matchesCollection,{
            activePlayer:userId,
            alivePlayers:[],
            boosters:[],
            createdAt:new Date(),
            loadedPlayers:[],
            numberOfPlayers:1,
            playersInQueue:[userId],
            roundNumber:0,
            creator:userId
        });
    }catch(err){
        console.error(err);
    }
}