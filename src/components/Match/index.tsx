import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Display } from "../../assets/Display"
import { useMatch } from "../../hooks/match.hook";
import {Map} from "./Map";

export const Match = () => {
    useMatch();
    // const matchId = useParams().id;
    // return <Display style={{flexDirection:'column'}}>
    //         <h1>Match id: ${matchId}</h1>
    //         <Link to={'/'}>Go to home</Link>
    //     </Display>
    return <Display style={{width:'100vw',height:'100vh'}}>
        <Map />
    </Display>
}