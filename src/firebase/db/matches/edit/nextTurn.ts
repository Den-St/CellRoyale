import { stepTime } from './../../../../consts/stepTime';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const nextTurn = async (matchId:string,userId:string) => {
    try{
        console.log('next turn')
        const matchRef = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(matchRef)).data();
        const userIndex = match?.alivePlayers.findIndex((player:string) => player === userId)
        
        return await updateDoc(matchRef,{
            activePlayer:userIndex === match?.alivePlayers.length - 1 
                ? (match?.alivePlayers[0] || '') : (match?.alivePlayers[userIndex + 1] || ''),
            roundNumber:userIndex === match?.alivePlayers.length - 1 ? match?.roundNumber + 1 : match?.roundNumber,
            stepEndTime:(new Date().getTime()/1000) + stepTime
        });
    }catch(err){
        console.error(err);
    }
}