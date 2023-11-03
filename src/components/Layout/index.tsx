import { useLocation, useParams } from "react-router-dom"
import { Display } from "../../assets/Display"
import { wrappedRoutes } from "../../consts/routes"
import { Header } from "../Header"
import { Background } from "./Background"
import { Container } from "./styles"

type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const headerExcludedRoutes = [wrappedRoutes.login, wrappedRoutes.registration, wrappedRoutes.match.replace('/:id','')];
    const backgroundExcludedRoutes = [wrappedRoutes.match.replace('/:id','')];
    const route = useLocation().pathname;
    const isOnHeaderExcludedRoute = !headerExcludedRoutes.some(exRoute => route.includes(exRoute));
    const isOnBackgroundExcludedRoute = !backgroundExcludedRoutes.some(exRoute => route.includes(exRoute));

    return <Container $excludedRoute={!isOnHeaderExcludedRoute}>
        {isOnHeaderExcludedRoute && <Header/>}
        <Display style={{width:'100vw',height:'100%',justifyContent:"center",alignItems:"center"}} >
            {children}
        </Display>
        {isOnBackgroundExcludedRoute && <Background/>}
    </Container>
}