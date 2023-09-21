import { Route, Routes } from "react-router-dom";
import { Rating } from "../components/RatingPage";
import { Login, MainSearchPage, Match, Registration } from "../pages";

export const navRoutes = {

}

export const routes = {
    registration:"/registration",
    login:"/login",
    mainSearchPage:`/`,
    match:`/match/:id`,
    rating:`/rating`,
};

export const PublicRoutes = [
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={routes.mainSearchPage} element={<MainSearchPage/>} path={routes.mainSearchPage}/>,
    <Route key={routes.mainSearchPage} element={<Match/>} path={routes.match}/>,
    <Route key={routes.rating} element={<Rating/>} path={routes.rating}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}