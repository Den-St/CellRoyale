import { UserT } from './../../../../types/user';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseInit';
import { collectionsKeys } from '../../collectionsKeys';
import { getBoosterTypeById } from '../../boosterType/get/getBoosterTypeById';
export const getUserById = async (userId:string) => {
    try{
        if(!userId) return;
        console.log('userId',userId)
        const document = doc(db,collectionsKeys.users,userId);
        const userDoc = (await getDoc(document));
        const user = userDoc.data();
        if(!user) return;
        user.id = userDoc.id;
        user.activeBooster = user.activeBooster ? await getBoosterTypeById(user.activeBooster) : '';

        return user as UserT;
    }catch(err){
        console.error(err);
    }
}