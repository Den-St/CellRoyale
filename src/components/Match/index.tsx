import { Display } from "../../assets/Display"
import { useMatch } from "../../hooks/match.hook";
import {Map} from "./Map";

export const Match = () => {
    const {} = useMatch();
    return <Display width={'100vh'} height={'100vh'}>
        <Map/>
    </Display>
}