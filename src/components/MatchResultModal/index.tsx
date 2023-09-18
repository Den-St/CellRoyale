import { Modal, Spin, Tag } from "antd"
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { MatchResultT } from "../../types/matchResult";

type Props = {
    open:boolean;
    onClose:() => void;
    matchResult:MatchResultT | null,
    isModalOpened:boolean,
    isWinner:boolean;
}
export const MatchResultModal:React.FC<Props> = ({isModalOpened,open,matchResult,onClose,isWinner}) => {
    // const {matchResult,loading} = useMatchWinner();
    const userId = useAppSelector(state => state.user.id);
    const place = matchResult?.players?.find(player => userId === player.player);
    console.log('f',matchResult);
    return <Modal okButtonProps={{hidden:true}} cancelButtonProps={{hidden:true}} closeIcon={<></>} onCancel={onClose} open={open || !!place && isModalOpened}>
        {place?.place === 1  ? <Tag color={'green'}>Winner</Tag> : <Tag>{place?.place}</Tag>}
        {!matchResult ? <Spin/> :
            <p>{matchResult?.id}</p>
        }
        <Link to={'/'}>Leave</Link>
        {!isWinner && <button onClick={onClose}>Watch</button>}
    </Modal>
}