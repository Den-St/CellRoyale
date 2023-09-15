import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const nextTurn = async (matchId:string,userId:string) => {
    try{
        const matchRef = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(matchRef)).data();
        const userIndex = match?.alivePlayers.findIndex((player:string) => player === userId)

        await updateDoc(matchRef,{
            activePlayer:userIndex === match?.alivePlayers.length - 1 
                ? match?.alivePlayers[0] : match?.alivePlayers[userIndex + 1],
            roundNumber:userIndex === match?.alivePlayers.length - 1 ? match?.roundNumber + 1 : match?.roundNumber
        });
    }catch(err){
        console.error(err);
    }
}