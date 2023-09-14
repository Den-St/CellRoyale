import { Display } from "../../assets/Display"
import { Header } from "../Header/indes"
import { Background } from "./Background"
import { Container } from "./styles"

type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    return <Container>
        <Header/>
        <Display width="100vw" height="100%" justify="center" align="center">
            {children}
        </Display>
        <Background/>
    </Container>
}