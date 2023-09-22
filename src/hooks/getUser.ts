import { UserT } from './../types/user';
import { getUserById } from './../firebase/db/users/get/getUserById';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const useGetUser = () => {
    const userId = useParams().id;
    const [userLoading,setUserLoading] = useState(false);
    const [user,setUser] = useState<UserT>();

    const fetch = async () => {
        if(!userId) return;
        setUserLoading(true);
        const res = await getUserById(userId);
        if(!res) return;
        setUserLoading(false);
        setUser(res);
    }

    useEffect(() => {
        fetch();
    },[userId]);

    return {user,userLoading};
}