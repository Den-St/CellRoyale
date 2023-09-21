import { maxPlayersNumber } from './../consts/maxPlayersNumber';
import { useEffect, useRef, useState } from "react";
import { nextTurn } from "../firebase/db/matches/edit/nextTurn";
import { useAppSelector } from "./redux";

export const useStepTimer = () => {
    const [timer,setTimer] = useState(0);
    const intervalRef = useRef<NodeJS.Timer>();
    const match = useAppSelector(state => state.match);
    const matchResult = useAppSelector(state => state.matchResult);
    const userId = useAppSelector(state => state.user.id);
    
    useEffect(() => {
        clearInterval(intervalRef.current);
        if(match.isEnded){
            setTimer(0);
            return;
        } 

        const interval = setInterval(() => {
            if(!match?.stepEndTime) return;

            setTimer(match?.stepEndTime - (new Date().getTime()/1000));
        }, 1000);
        
        intervalRef.current = interval;
        return () => clearInterval(interval);
      }, [match.stepEndTime,match.isEnded]);

      useEffect(() => {
        if(match.isEnded) return;
        if(userId === match.activePlayer?.id && timer <= 0 && match.id && userId){
            nextTurn(match.id,userId);
            clearInterval(intervalRef.current);
        }else if(timer <= 0) {
            clearInterval(intervalRef.current);
        }
    },[timer,match.isEnded]);


    return {timer};
}