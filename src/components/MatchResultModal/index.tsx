import { Modal, Spin, Tag } from "antd"
import { useMatchWinner } from "../../hooks/matchWinner";
import { useAppSelector } from "../../hooks/redux";

type Props = {
    open:boolean;
}
export const MatchResultModal:React.FC<Props> = ({open}) => {
    const {matchResult,loading} = useMatchWinner();
    const userId = useAppSelector(state => state.user.id);
    const place = matchResult?.players?.findIndex(player => userId === player.player);
    return <Modal open={open}>
        {place === 0  ? <Tag color={'green'}>Winner</Tag> : <Tag>{place || 0 + 1}</Tag>}
        {loading ? <Spin/> :
            <p>{matchResult?.id}</p>
        }
    </Modal>
}