import { Display } from "../../assets/Display"
import { LoginLink } from "../Layout/styles"

const Logo = () => <svg xmlns="http://www.w3.org/2000/svg" width="65" height="73" viewBox="0 0 65 73" fill="none">
    <path d="M5.89007 21.1368L32.5 5.7735L59.1099 21.1368V51.8632L32.5 67.2265L5.89007 51.8632V21.1368Z" fill="white" stroke="url(#paint0_angular_5_30)" stroke-width="10"/>
    <defs>
        <radialGradient id="paint0_angular_5_30" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.5 36.5) rotate(90) scale(36.5)">
            <stop stop-color="#A8A8A8"/>
            <stop offset="0.166954" stop-color="#E18441"/>
            <stop offset="0.331652" stop-color="#E875DC"/>
            <stop offset="0.500165" stop-color="#A8A8A8"/>
            <stop offset="0.666092" stop-color="#79CEE9"/>
            <stop offset="0.831972" stop-color="#E875DC"/>
            <stop offset="1" stop-color="#A8A8A8"/>
        </radialGradient>
    </defs>
</svg>

export const Header = () => {
    return <Display justify="space-between" padding="0 100px" zIndex="1" position="fixed" top={'0'} width="100vw" height="87px" background="white" align="center">
        <Logo/>
        <Display gap={'15px'}>
            <LoginLink to={'/login'}>Log in</LoginLink>
            <LoginLink to={'/registration'}>Sign up</LoginLink>
        </Display>
    </Display>
}