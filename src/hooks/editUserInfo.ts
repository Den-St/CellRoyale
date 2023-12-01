import { useEffect } from 'react';
import { useAppSelector, useAppDispacth } from './redux';
import { useState } from 'react';
import { changeUserInfo } from '../firebase/db/users/edit/changeUserInfo';
import { setUser } from '../store/userSlice';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebaseInit';
import { v4 } from 'uuid';
import { UserT } from '../types/user';

export const useEditUserInfo = () => {
    const [newUserInfo,setNewUserInfo] = useState<UserT>();
    const [isEditingUserInfo,setIsEditingUserInfo] = useState(false);
    const dispatch = useAppDispacth();
    const [newImage,setNewImage] = useState<File | null>();

    const user = useAppSelector(state => state.user);

    const changePhoto = async () => {
        if(!newImage) return;
        const newImageRef = ref(storage, `profileImage/${newImage?.name + v4()}`)
        const newImageUrl = await uploadBytes(newImageRef,newImage); 
        return newImageUrl.metadata.fullPath;
    }  

    const onConfirmEditUserInfo = async () => {
        if(!newUserInfo || !user.id) return;
        console.log('1',newUserInfo);
        changePhoto().then(async (newImageUrl) => {
            if(!user.id || !newUserInfo.displayName) return;
            dispatch(setUser({
                ...newUserInfo,
                photoURL:newImage ? URL.createObjectURL(newImage) : newUserInfo.photoURL
            }));
            console.log('2',{
                ...newUserInfo,
                photoURL:newImage ? URL.createObjectURL(newImage) : newUserInfo.photoURL
            });
            console.log('3',{...newUserInfo, photoURL:newImageUrl});
            await changeUserInfo(user.id,{...newUserInfo, photoURL:newImageUrl || newUserInfo.photoURL});
        });
        setIsEditingUserInfo(false);
        
    }
    const changeNameUserInfo = (text:string) => {
        setNewUserInfo(prev => {
            if(!prev) return prev;
            return ({...prev,displayName:text});
        });
    }
    const onCancel = () => {
        setIsEditingUserInfo(false);
        setNewUserInfo(user);
        setNewImage(null);
    }
    useEffect(() => {
        if(user) setNewUserInfo(user);
    },[user]);

    return {onConfirmEditUserInfo,changeNameUserInfo,isEditingUserInfo,setIsEditingUserInfo,setNewImage,newImage,newUserInfo,onCancel};
}