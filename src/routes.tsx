import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { MainSearchPage } from "./components/MainSearchPage";
import { Registration } from "./components/Registration";

export const navRoutes = {

}

export const routes = {
    registration:"/registration",
    login:"/login",
    mainSearchPage:`/`,
    user:`/user/:id`,
    chat:`/chat/:id`,
};

export const PublicRoutes = [
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={routes.mainSearchPage} element={<MainSearchPage/>} path={routes.mainSearchPage}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}