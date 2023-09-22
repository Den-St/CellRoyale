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
    const [newImage,setNewImage] = useState<File>();

    const user = useAppSelector(state => state.user);

    const changePhoto = async () => {
        if(!newImage) return;
        const newImageRef = ref(storage, `profileImage/${newImage?.name + v4()}`)
        const newImageUrl = await uploadBytes(newImageRef,newImage); 
        return newImageUrl.metadata.fullPath;
    }  

     const onConfirmEditUserInfo = async () => {
        if(!newUserInfo || !user.id) return;
        changePhoto().then(async (newImageUrl) => {
            if(!user.id || !newUserInfo.displayName) return;
            await changeUserInfo(user.id,{...newUserInfo, photoURL:newImageUrl});
        });
        setIsEditingUserInfo(false);
        dispatch(setUser({
            ...newUserInfo
        }));
    }
    const changeNameUserInfo = (text:string) => {
        setNewUserInfo(prev => {
            if(!prev) return prev;
            return ({...prev,displayName:text});
        });
    }
    useEffect(() => {
        if(user) setNewUserInfo(user);
    },[user]);

    return {onConfirmEditUserInfo,changeNameUserInfo,isEditingUserInfo,setIsEditingUserInfo,setNewImage,newImage,newUserInfo};
}