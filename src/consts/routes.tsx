import { Route, Routes } from "react-router-dom";
import { Background } from "../components/Layout/Background";
import { Login } from "../components/Login";
import { MainSearchPage } from "../components/MainSearchPage";
import { Match } from "../components/Match";
import { Registration } from "../components/Registration";

export const navRoutes = {

}

export const routes = {
    registration:"/registration",
    login:"/login",
    mainSearchPage:`/`,
    match:`/match/:id`,
};

export const PublicRoutes = [
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={routes.mainSearchPage} element={<Background/>} path={routes.mainSearchPage}/>,
    <Route key={routes.mainSearchPage} element={<Match/>} path={routes.match}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}