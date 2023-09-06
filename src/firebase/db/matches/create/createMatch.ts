import { matchesCollection } from './../match.collection';
import { addDoc } from "firebase/firestore";

export const createMatch = async (userId:string) => {
    try{
        return await addDoc(matchesCollection,{
            activePlayer:'',
            activePlayers:[],
            boosters:[],
            createdAt:new Date(),
            loadedPlayers:[],
            numberOfPlayers:1,
            playersInQueue:[userId],
            roundNumber:0
        });
    }catch(err){
        console.error(err);
    }
}