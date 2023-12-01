import { setDoc, updateDoc } from 'firebase/firestore';
import { collectionsKeys } from './../../collectionsKeys';
import { doc } from 'firebase/firestore';
import { db, storage } from '../../../firebaseInit';
import { getDownloadURL, ref } from 'firebase/storage';
import { UserT } from '../../../../types/user';

export const changeUserInfo = async (userId:string,newInfo:UserT) => {
    try{
        const userDoc = doc(db,collectionsKeys.users,userId);
        console.log('3',newInfo)
        if(newInfo.photoURL?.includes('profileImage')){
            getDownloadURL(ref(storage,newInfo.photoURL)).then(async (url) => {
                await updateDoc(userDoc,{
                    photoURL:url,
                    displayName:newInfo.displayName
                });
            })
        }
        await updateDoc(userDoc,{
            displayName:newInfo.displayName,
            photoURL:newInfo.photoURL
        });
    }catch(err){
        console.error(err);
    }
}