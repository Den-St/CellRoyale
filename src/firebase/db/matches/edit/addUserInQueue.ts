import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";
import { addMatchInQueue } from "../../users/edit/addMatchInQueue";

export const addUserInQueue = async (matchId:string,userId:string) => {
    try{
        const matchRef = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(matchRef)).data();
        await updateDoc(matchRef,
            {
                playersInQueue:[...match?.playersInQueue,userId],
                numberOfPlayers:match?.numberOfPlayers + 1,
            });
        await addMatchInQueue(matchId,userId);
    }catch(err){
        console.error(err);
    }
}