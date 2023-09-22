import { UserT } from './../../../../types/user';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseInit';
import { collectionsKeys } from '../../collectionsKeys';
export const getUserById = async (userId:string) => {
    try{
        const document = doc(db,collectionsKeys.users,userId);
        const userDoc = (await getDoc(document));
        const user = userDoc.data();
        if(!user) return;
        user.id = userDoc.id;

        return user as UserT;
    }catch(err){
        console.error(err);
    }
}