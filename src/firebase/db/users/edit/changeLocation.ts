import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebaseInit";
import { collectionsKeys } from "../../collectionsKeys";

export const changePlayersLocation = async (userId:string,location:number[]) => {
    try{
        const document = doc(db,collectionsKeys.users,userId);

        await updateDoc(document,{
            location
        });
    }catch(err){
        console.error(err);
    }
} 