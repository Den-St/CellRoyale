import { Navigate, Route, Routes } from "react-router-dom";
import { Login, MainSearchPage, Match, Registration,UserProfile,Rating,MyProfile } from "../pages";

export const navRoutes = {

}
const baseRoute = '/CellRoyale';
const routeWrap = (route:string) => baseRoute + route;

export type routesKeysType = 'registration' | 'login' | 'mainSearchPage' | 'match' | 'rating' | 'myProfile' | 'userProfile';
export const routes:Record<routesKeysType,string> = {
    registration:"/registration",
    login:"/login",
    mainSearchPage:`/`,
    match:`/match/:id`,
    rating:`/rating`,
    myProfile:'/myProfile',
    userProfile:'/users/:id',
};

export const wrappedRoutes:Record<routesKeysType,string>  = {
    registration:"",
    login:"",
    mainSearchPage:``,
    match:``,
    rating:``,
    myProfile:'',
    userProfile:'',
};
Object.keys(routes).forEach(key => wrappedRoutes[key as routesKeysType] = routeWrap(routes[key as routesKeysType]));


export const PublicRoutes = [
    <Route key={wrappedRoutes.registration} element={<Registration/>} path={wrappedRoutes.registration}/>,
    <Route key={wrappedRoutes.login} element={<Login/>} path={wrappedRoutes.login}/>,
    <Route key={wrappedRoutes.mainSearchPage} element={<MainSearchPage/>} path={wrappedRoutes.mainSearchPage}/>,
    <Route key={wrappedRoutes.match} element={<Match/>} path={wrappedRoutes.match}/>,
    <Route key={wrappedRoutes.rating} element={<Rating/>} path={wrappedRoutes.rating}/>,
    <Route key={wrappedRoutes.myProfile} element={<MyProfile/>} path={wrappedRoutes.myProfile}/>,
    <Route key={wrappedRoutes.userProfile} element={<UserProfile/>} path={wrappedRoutes.userProfile}/>,
]

export const RoutesSwitch = () => {
    return <Routes>
        {PublicRoutes}
    </Routes>
}