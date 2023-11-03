import { Button, Modal, Spin, Tag } from "antd"
import { Link } from "react-router-dom";
import { Display } from "../../assets/Display";
import { placeToRating } from "../../consts/placeToRating";
import { wrappedRoutes } from "../../consts/routes";
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
    const place = matchResult?.playersPlaces?.find(player => userId === player.player);

    return <Modal okButtonProps={{hidden:true}} cancelButtonProps={{hidden:true}} closeIcon={<></>} onCancel={onClose} open={open || !!place && isModalOpened}>
        {!matchResult ? <Spin/> 
        : <Display style={{flexDirection:'column',alignItems:'center',padding:'25px 0',gap:'20px'}}>

            {place?.place === 1  ? <Tag color={'green'} style={{fontSize:'20px',padding:'5px'}}>Winner</Tag> : <Tag style={{fontSize:'20px',padding:'5px'}}>{place?.place}  place</Tag>}

            {place?.place ? placeToRating[place?.place] > 0 ? <Tag color={'blue'} style={{fontSize:'20px',padding:'5px'}}>+{placeToRating[place?.place]}</Tag> : <Tag color={'red'} style={{fontSize:'20px',padding:'5px'}}>{placeToRating[place?.place]}</Tag> : <Spin/>}
            
            {!isWinner ? <Display style={{width:'200px',justifyContent:'space-between'}}>
                <Link style={{fontSize:'20px'}} to={wrappedRoutes.mainSearchPage}>Leave</Link>
                <Button onClick={onClose}>Watch</Button>
            </Display>
            : <Display style={{width:'200px',justifyContent:'center'}}>
                <Link style={{fontSize:'20px'}} to={wrappedRoutes.mainSearchPage}>Leave</Link>
            </Display>}
            
        </Display>
        }
    </Modal>
}