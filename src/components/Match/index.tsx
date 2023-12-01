import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Display } from "../../assets/Display"
import { useMatch } from "../../hooks/match.hook";
import {Map} from "./Map";

export const Match = () => {
    const {loading} = useMatch();

    return <Display style={{width:'100vw',height:'100vh'}}>
        <Map loading={loading}/>
    </Display>
}