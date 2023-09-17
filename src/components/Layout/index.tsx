import { useLocation, useParams } from "react-router-dom"
import { Display } from "../../assets/Display"
import { Header } from "../Header/indes"
import { Background } from "./Background"
import { Container } from "./styles"

type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    const headerExcludedRoutes = ['/login', '/registration', '/match'];
    const route = useLocation().pathname;
    const isOnExcludedRoute = !headerExcludedRoutes.some(exRoute => route.includes(exRoute));

    return <Container $excludedRoute={!isOnExcludedRoute}>
        {isOnExcludedRoute && <Header/>}
        <Display width="100vw" height="100%" $justify="center" $align="center">
            {children}
        </Display>
        {isOnExcludedRoute && <Background/>}
    </Container>
}