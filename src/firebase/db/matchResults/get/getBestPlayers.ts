import { usersCollection } from './../../users/users.collection';
import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { UserT } from '../../../../types/user';

export const getBestPlayers = async () => {
    try{
        const usersQ = query(usersCollection,orderBy('rating','desc'),limit(15));
        const usersDocs = (await getDocs(usersQ)).docs;
        const users = usersDocs.map(userDoc => userDoc.data());

        users.forEach((user,i) => {
            user.id = usersDocs[i].id; 
        });
        return users as UserT[];
    }catch(err){
        console.error(err);
    }
}