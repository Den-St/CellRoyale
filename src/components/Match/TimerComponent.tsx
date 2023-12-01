import { useStepTimer } from "../../hooks/stepTimer.hook";
import { Timer } from "./InformationBlock";

type Props = {
    clearMapFromAvailableCells:() => void,
    makeUserNotActiveAtClient:() => void
}

export const TimerComponent:React.FC<Props> = ({clearMapFromAvailableCells,makeUserNotActiveAtClient}) => {
    const {timer} = useStepTimer(clearMapFromAvailableCells,makeUserNotActiveAtClient);
    
    return <Timer time={timer}>{timer}</Timer>
}