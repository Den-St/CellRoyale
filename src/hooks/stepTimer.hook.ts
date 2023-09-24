import { useEffect, useRef, useState } from "react";
import { nextTurn } from "../firebase/db/matches/edit/nextTurn";
import { decreaseBoosterStepsRemaining } from "../firebase/db/users/edit/decreaseBoosterStepsRemaining";
import { decrementBoosterStepsRemainingLocally } from "../store/userSlice";
import { useAppDispacth, useAppSelector } from "./redux";

export const useStepTimer = () => {
    const [timer,setTimer] = useState(0);
    const intervalRef = useRef<NodeJS.Timer>();
    const match = useAppSelector(state => state.match);
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispacth();
    
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
        if(user.id === match.activePlayer?.id && timer <= 0 && match.id && user.id){
            nextTurn(match.id,user.id);
            if(user.boosterStepsRemaining){
                decreaseBoosterStepsRemaining(user.id);
                dispatch(decrementBoosterStepsRemainingLocally());
            }
            clearInterval(intervalRef.current);
        }else if(timer <= 0) {
            clearInterval(intervalRef.current);
        }
    },[timer,match.isEnded]);


    return {timer};
}