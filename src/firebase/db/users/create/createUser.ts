import { usersCollection } from '../users.collection';
import { addDoc } from "firebase/firestore";
import { CreateUserT } from '../../../../types/user';

export const createUser = async (user:CreateUserT) => {
    try{
        await addDoc(usersCollection,
            {
                ...user,
                rating:500,
                numberOfMatches:0,
                numberOfWins:0,
                boosterStepsRemaining:0,
                activeBooster:''
            });
    }catch(err){
        console.error(err);
    }
}