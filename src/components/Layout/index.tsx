import { Display } from "../../assets/Display"
import { Header } from "../Header/indes"
import { Container } from "./styles"

type Props = {
    children:React.ReactNode
}

export const Layout:React.FC<Props> = ({children}) => {
    return <Container>
        <Header/>
        <Display>
            {children}
        </Display>
    </Container>
}