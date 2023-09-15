import { nextTurn } from './nextTurn';
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const eliminatePlayer = async (matchId?:string,userId?:string) => {
    try{
        if(!matchId || !userId) return;
        const matchDoc = doc(db,collectionsKeys.matches,matchId);
        const match = await getDoc(matchDoc);
        if(match?.data()?.activePlayer === userId) await nextTurn(matchId,userId);

        await updateDoc(matchDoc,{
            alivePlayers:match?.data()?.alivePlayers.filter((player:string) => player !== userId)
        });
    }catch(err){
        console.error(err);
    }
}