import { Normalize } from "styled-normalize";
import { Layout } from "./components/Layout";
import { RoutesSwitch } from "./consts/routes";
import {useAppSelector} from "./hooks/redux";
import { AuthProvider } from "./providers/authProvider";

function App() {
  console.log(useAppSelector(state => state.user));
  console.log(useAppSelector(state => state.match));
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
