import { UserT } from './../types/user';
import { useState, useEffect } from 'react';
import { getBestPlayers } from '../firebase/db/matchResults/get/getBestPlayers';
export const useRating = () => {
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState<UserT[]>();

    const fetch = async () => {
        setLoading(true);
        const res = await getBestPlayers();
        if(!res) return;
        setUsers(res);
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[]);

    return {loading,users};
}