import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseInit';
import { collectionsKeys } from '../../collectionsKeys';
export const getUserById = async (userId:string) => {
    try{
        const document = doc(db,collectionsKeys.users,userId);
        const user = (await getDoc(document)).data();
        return {...user,id:userId};
    }catch(err){
        console.error(err);
    }
}