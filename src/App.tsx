import { Normalize } from "styled-normalize";
import { RoutesSwitch } from "./routes";
import {useAppSelector} from "./hooks/redux";
import { AuthProvider } from "./providers/authProvider";

function App() {
  console.log(useAppSelector(state => state.user));
  return <>
    <AuthProvider>
      <Normalize/>
      <RoutesSwitch/>
    </AuthProvider>
  </>
}

export default App;
