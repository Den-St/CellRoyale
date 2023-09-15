import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const cancelSearch = async (matchId:string,userId:string) => {
    try{
        const matchRef = doc(db,collectionsKeys.matches,matchId);
        const match = (await getDoc(matchRef)).data();
        if(match?.playersInQueue.length === 1) {
            const userRef = doc(db,collectionsKeys.users,userId);

            await updateDoc(userRef,
                {
                    matchQueue:''
                });
            return await deleteDoc(matchRef);
        }
        await updateDoc(matchRef,
            {
                playersInQueue:match?.playersInQueue.filter((id:string) => id !== userId),
                numberOfPlayers:match?.numberOfPlayers - 1,
                creator:match?.playersInQueue[1],
                activePlayer:match?.playersInQueue[1]
            });
        const userRef = doc(db,collectionsKeys.users,userId);

        await updateDoc(userRef,
            {
                matchQueue:''
            });
    }catch(err){
        console.error(err);
    }
}