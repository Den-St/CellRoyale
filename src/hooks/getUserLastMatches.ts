import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLastMatches } from '../firebase/db/matchResults/get/getLastMatches';
import { MatchInfoT } from '../types/matchInfo';

export const useGetUserLastMatches = () => {
    const userId = useParams().id;
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