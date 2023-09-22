import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const setActivePlayer = async (matchId:string,userId:string) => {
    try{
        const matchRef = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(matchRef)).data();
        if(match?.activePlayer) return;
        await updateDoc(matchRef,
            {
                activePlayer:userId,
            });
    }catch(err){
        console.error(err);
    }
}