import { useParams } from 'react-router-dom';
import { MatchResultT } from './../types/matchResult';
import { useState, useEffect } from 'react';
import { getMatchResult } from '../firebase/db/matchResults/get/getMatchResult';
export const useMatchWinner = () => {
    const [matchResult,setMatchResult] = useState<MatchResultT>();
    const [loading,setLoading] = useState(false);
    const matchId = useParams().id;

    const fetch = async () => {
        if(!matchId) return;
        setLoading(true);
        const res = await getMatchResult(matchId);
        setMatchResult(res);
        setLoading(false);
    }

    useEffect(() => {
        if(matchId) fetch();
    },[matchId]);

    return {loading,matchResult};
}