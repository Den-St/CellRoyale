import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getLastMatches } from '../firebase/db/matchResults/get/getLastMatches';
import { MatchInfoT } from '../types/matchInfo';
import { useAppSelector } from './redux';

export const useGetMyLastMatches = () => {
    const myId = useAppSelector(state => state.user.id);
    const [loading,setLoading] = useState(false);
    const [matches,setMatches] = useState<MatchInfoT[]>();
    const userId = useParams().id;

    const fetch = async () => {
        if(!myId) return;
        setLoading(true);
        const res = await getLastMatches(userId || myId);
        if(!res) return;
        setMatches(res.map(res => ({
            id:res.id,
            createdAt:res.createdAt,
            place:res.playersPlaces.find(playerPlace => playerPlace.player === userId || playerPlace.player === myId)?.place || 0,
        })));
        setLoading(false);
    }

    useEffect(() => {
        fetch();
    },[myId,userId]);

    return {loading,matches};
}

