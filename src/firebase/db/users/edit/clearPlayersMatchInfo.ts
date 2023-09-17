import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const clearPlayersMatchInfo = async (userId:string) => {
    try{
        const document = doc(db,collectionsKeys.users,userId);

        await updateDoc(document,{
            location:[],
            color:''
        });
    }catch(err){
        console.error(err);
    }
}