import { useState, useEffect } from 'react';
import { getLastMatches } from '../firebase/db/matchResults/get/getLastMatches';
import { MatchInfoT } from '../types/matchInfo';
import { useAppSelector } from './redux';

export const useGetUsersLastMatches = () => {
    const userId = useAppSelector(state => state.user.id);
    const [loading,setLoading] = useState(false);
    const [matches,setMatches] = useState<MatchInfoT[]>();

    const fetch = async () => {
        if(!userId) return;
        setLoading(true);
        const res = await getLastMatches(userId);
        if(!res) return;
        setMatches(res.map(res => ({
            id:res.id,
            createdAt:res.createdAt,
            place:res.playersPlaces.find(playerPlace => playerPlace.player === userId)?.place || 0,
        })));
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[userId]);

    return {loading,matches};
}