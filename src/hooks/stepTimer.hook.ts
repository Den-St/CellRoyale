import { stepTime } from './../consts/stepTime';
import { useEffect, useRef, useState } from "react";
import { nextTurn } from "../firebase/db/matches/edit/nextTurn";
import { decreaseBoosterStepsRemaining } from "../firebase/db/users/edit/decreaseBoosterStepsRemaining";
import { decrementBoosterStepsRemainingLocally } from "../store/userSlice";
import { useAppDispacth, useAppSelector } from "./redux";

export const useStepTimer = (clearAvailableCells:() => void,makeNotActiveAtClient:() => void) => {
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
            const notFixedTime = match?.stepEndTime - (new Date().getTime()/1000);
            const time = notFixedTime > stepTime ? stepTime : +notFixedTime.toFixed(1);
            setTimer(+notFixedTime.toFixed(1));//if time with fault bigger than clear time for step show user clear time for step
        }, 100);
        
        intervalRef.current = interval;
        return () => clearInterval(interval);
      }, [match.stepEndTime,match.isEnded]);

      useEffect(() => {
        if(match.isEnded) return;
        if(user.id === match.creator && timer <= 0 && match.id && user.id && match?.activePlayer?.id){
            console.count('clear')
            nextTurn(match.id,match.activePlayer.id);
            if(user.boosterStepsRemaining){
                decreaseBoosterStepsRemaining(user.id);
                dispatch(decrementBoosterStepsRemainingLocally());
            }
            makeNotActiveAtClient();
            clearAvailableCells();
            clearInterval(intervalRef.current);
        }else if(timer <= 0) {
            clearInterval(intervalRef.current);
        }
    },[timer,match.isEnded]);


    return {timer};
}