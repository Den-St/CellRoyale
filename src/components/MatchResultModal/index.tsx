import { Modal, Spin, Tag } from "antd"
import { useMatchWinner } from "../../hooks/matchWinner";
import { useAppSelector } from "../../hooks/redux";

type Props = {
    open:boolean;
}
export const MatchResultModal:React.FC<Props> = ({open}) => {
    const {matchResult,loading} = useMatchWinner();
    const userId = useAppSelector(state => state.user.id);
    const place = matchResult?.players?.find(player => userId === player.player);
    console.log(matchResult)
    return <Modal open={open || !!place}>
        {place?.place === 1  ? <Tag color={'green'}>Winner</Tag> : <Tag>{place?.place}</Tag>}
        {loading ? <Spin/> :
            <p>{matchResult?.id}</p>
        }
    </Modal>
}