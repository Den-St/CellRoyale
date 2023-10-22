import { Navigate, Route, Routes } from "react-router-dom";
import { Login, MainSearchPage, Match, Registration,UserProfile,Rating,MyProfile } from "../pages";

export const navRoutes = {

}

export const routes = {
    registration:"/registration",
    login:"/login",
    mainSearchPage:`/`,
    match:`/match/:id`,
    rating:`/rating`,
    myProfile:'/myProfile',
    userProfile:'/users/:id',
    ghInitPage:'/CellRoyale'
};

const RerouteFromGHInitPage = () => {
    return <Navigate to={routes.mainSearchPage}/>
}

export const PublicRoutes = [
    <Route key={routes.registration} element={<Registration/>} path={routes.registration}/>,
    <Route key={routes.login} element={<Login/>} path={routes.login}/>,
    <Route key={routes.mainSearchPage} element={<MainSearchPage/>} path={routes.mainSearchPage}/>,
    <Route key={routes.match} element={<Match/>} path={routes.match}/>,
    <Route key={routes.ghInitPage} element={<RerouteFromGHInitPage/>} path={routes.ghInitPage}/>,
    // <Route key={routes.rating} element={<Rating/>} path={routes.rating}/>,
    // <Route key={routes.myProfile} element={<MyProfile/>} path={routes.myProfile}/>,
    // <Route key={routes.userProfile} element={<UserProfile/>} path={routes.userProfile}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}