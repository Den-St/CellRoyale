import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const addUserInQueue = async (matchId:string,userId:string) => {
    try{
        const matchRef = doc(db,collectionsKeys.matches,matchId);
        const document = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(document)).data();
        await updateDoc(matchRef,
            {
                playersInQueue:[...match?.playersInQueue,userId]
            });
    }catch(err){
        console.error(err);
    }
}