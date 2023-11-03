import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Display } from "../../assets/Display"
import { useMatch } from "../../hooks/match.hook";
import {Map} from "./Map";

export const Match = () => {
    useMatch();

    return <Display style={{width:'100vw',height:'100vh'}}>
        <Map />
    </Display>
}