import { collectionsKeys } from './../../collectionsKeys';
import { db } from './../../../firebaseInit';
import { deleteDoc, doc } from "firebase/firestore";

export const removeBoosterById = async (id:string) => {
    try{
        await deleteDoc(doc(db,collectionsKeys.boosters,id));
    }catch(err){
        console.error(err);
    }
}