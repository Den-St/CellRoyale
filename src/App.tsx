import { Normalize } from "styled-normalize";
import { Game } from "./components/Game";
import { RoutesSwitch } from "./routes";
import {useAppSelector} from "./hooks/redux";

function App() {
  console.log(useAppSelector(state => state.user));
  return <>
    <Normalize/>
    <RoutesSwitch/>
  </>
}

export default App;
