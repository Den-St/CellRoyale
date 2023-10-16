import { Avatar, Button, Popconfirm, Spin } from "antd"
import { Navigate } from "react-router-dom"
import { Display } from "../../assets/Display"
import { UserNameLink } from "../../assets/UserNameLink"
import { defaultAvatar } from "../../consts/defaultAvatar"
import { useLogout } from "../../hooks/logout"
import { useAppSelector } from "../../hooks/redux"
import { HeaderLink, LogoLink, LogoText } from "./styles"
import {LogoutOutlined} from '@ant-design/icons';

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
    const user = useAppSelector(state => state.user);
    const {logout,onLogout} = useLogout();

    if(logout) return <Navigate to={'/registration'}/>

    return <Display style={{justifyContent:"space-between",padding:"0 100px",zIndex:'1',position:'fixed',top:0,width:"100vw",height:"87px",background:"white",alignItems:"center"}}>
        <LogoLink to={'/'}><Logo/><LogoText>CR</LogoText></LogoLink>
        <Display style={{gap:'30px',alignItems:'center'}}>
            <HeaderLink to={'/rating'}>Rating</HeaderLink>
            {user ?
                <Display style={{gap:'10px',alignItems:'center'}}>
                    <Avatar src={user.photoURL || defaultAvatar}/>
                    <UserNameLink to={'/myProfile'}>{user.displayName}</UserNameLink>
                    {/* <Popconfirm
                        title="Logout from account"
                        description="Are you sure to logout from account?"
                        onConfirm={onLogout}
                        okText="Yes"
                        cancelText="No">
                        <Button danger style={{'background':'white'}} ><LogoutOutlined /></Button>
                    </Popconfirm> */}
                </Display>
                : <Spin/>}
        </Display>
    </Display>
}