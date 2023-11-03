import { getBoosterTypeById } from './../../boosterType/get/getBoosterTypeById';
import { getDocs, query, where } from "firebase/firestore";
import { usersCollection } from "../users.collection";

export const getUserByEmail = async (email?:string | null) => {
    try{
        const q = query(usersCollection,where('email', "==", email));
        const docs = await getDocs(q);
        const userDoc = docs.docs[0];
        const user = userDoc.data();
        // const activeBooster = user.activeBooster && await getBoosterTypeById(user.activeBooster);
        user.id = userDoc.id;
        // user.activeBooster = activeBooster;
        return user;
    }catch(err){
        console.error(err);
    }
}