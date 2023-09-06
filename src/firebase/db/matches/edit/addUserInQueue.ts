import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const addUserInQueue = async (matchId:string,userId:string) => {
    try{
        const matchRef = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(matchRef)).data();
        await updateDoc(matchRef,
            {
                playersInQueue:[...match?.playersInQueue,userId],
                numberOfPlayers:match?.numberOfPlayers + 1
            });
    }catch(err){
        console.error(err);
    }
}