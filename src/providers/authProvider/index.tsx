import { Spin } from "antd";
import React from "react"
import { Navigate, useLocation } from "react-router-dom";
import { Display } from "../../assets/Display";
import { wrappedRoutes } from "../../consts/routes";
import { useAuth } from "../../hooks/auth.hook";

type Props = {
    children:React.ReactNode
}

export const AuthProvider:React.FC<Props> = ({children}) => {
   const {loading, isSignedIn} = useAuth();
   const path = useLocation().pathname;
   
    if(loading) return <Display style={{width:'100%',height:'90vh',justifyContent:"center",alignItems:'center'}}><Spin/></Display>
    if(!loading && !isSignedIn && path !== wrappedRoutes.registration && path !== wrappedRoutes.login) {
        return <Navigate to={wrappedRoutes.registration}/>
    }
    return <>
        {children}
    </>
}
