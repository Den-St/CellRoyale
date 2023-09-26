import { Normalize } from "styled-normalize";
import { Layout } from "./components/Layout";
import { RoutesSwitch } from "./consts/routes";
import {useAppSelector} from "./hooks/redux";
import { AuthProvider } from "./providers/authProvider";

function App() {
  console.log('User',useAppSelector(state => state.user));
  console.log('Match',useAppSelector(state => state.match));
  console.log('Match result',useAppSelector(state => state.matchResult));
  
  return <>
    <AuthProvider>
      <Normalize/>
      <Layout>
        <RoutesSwitch/>
      </Layout>
    </AuthProvider>
  </>
}

export default App;
