import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const loadUser = async (matchId:string,playerId:string) => {
    try{
        const document = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(document)).data();
        if(match?.loadedPlayers.includes(playerId) || match?.alivePlayers.includes(playerId)) return;

        await updateDoc(document,
            {
                playersInQueue:match?.playersInQueue.filter((player:string) => player !== playerId),
                loadedPlayers:[...match?.loadedPlayers,playerId],
                alivePlayers:[...match?.alivePlayers,playerId],
            });
    }catch(err){
        console.error(err);
    }
}