import { Display } from "../../assets/Display"
import { LoginLink } from "../Layout/styles"
import { LogoLink, LogoText } from "./styles"

const Logo = () => <svg xmlns="http://www.w3.org/2000/svg" width="65" height="73" viewBox="0 0 65 73" fill="none">
    <path d="M5.89007 21.1368L32.5 5.7735L59.1099 21.1368V51.8632L32.5 67.2265L5.89007 51.8632V21.1368Z" fill="white" stroke="url(#paint0_angular_5_30)" strokeWidth="10"/>
    <defs>
        <radialGradient id="paint0_angular_5_30" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32.5 36.5) rotate(90) scale(36.5)">
            <stop offset="0.331652" stopColor="#E875DC"/>
            <stop offset="0.500165" stopColor="#A8A8A8"/>
            <stop offset="0.666092" stopColor="#79CEE9"/>
            <stop offset="0.831972" stopColor="#E875DC"/>
        </radialGradient>
    </defs>
</svg>

export const Header = () => {
    return <Display style={{justifyContent:"space-between",padding:"0 100px",zIndex:'1',position:'fixed',top:0,width:"100vw",height:"87px",background:"white",alignItems:"center"}}>
        <LogoLink to={'/'}><Logo/><LogoText>CR</LogoText></LogoLink>
        <Display style={{gap:'15px'}}>
            <LoginLink to={'/login'}>Log in</LoginLink>
            <LoginLink to={'/registration'}>Sign up</LoginLink>
        </Display>
    </Display>
}