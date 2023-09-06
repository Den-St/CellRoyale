import { Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Registration } from "./components/Registration";

export const navRoutes = {

}

export const routes = {
    registration:"/registration",
    login:"/login",
    job:`/job/:id`,
    user:`/user/:id`,
    chat:`/chat/:id`,
};

export const PublicRoutes = [
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}