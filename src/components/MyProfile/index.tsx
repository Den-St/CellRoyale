import { Avatar, Button, Input, Popconfirm } from "antd";
import { Display } from "../../assets/Display";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useAppSelector } from "../../hooks/redux";
import { PhotosInput, PhotosInputContainer, UserName } from "./styles";
import {UploadOutlined,LogoutOutlined,EditOutlined,CheckOutlined,CloseOutlined} from "@ant-design/icons";
import { useEditUserInfo } from "../../hooks/editUserInfo";
import { useGetUsersLastMatches } from "../../hooks/getUsersLastMatches";
import { signOut } from "firebase/auth";
import { googleAuthProvider } from "../../firebase/firebaseInit";
import { useState } from "react";

export const MyProfile = () => {
    const user = useAppSelector(state => state.user);
    const {onConfirmEditUserInfo,changeNameUserInfo,setIsEditingUserInfo,isEditingUserInfo,setNewImage,newImage,newUserInfo} = useEditUserInfo();
    const onImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setNewImage(e.target.files[0]);
        }
    };
    const [logout,setLogout] = useState(false);
    const onLogout = () => {
      signOut(googleAuthProvider).then(() => setLogout(true));
    }
    const {matches,loading} = useGetUsersLastMatches();
    console.log('matches',matches);
    return <Display style={{flexDirection:'column',gap:'10px'}}>
        {!isEditingUserInfo 
        ? <Display>
            <Avatar src={newImage ? URL.createObjectURL(newImage) : user.photoURL || defaultAvatar}/> 
            <UserName>
                {user?.displayName || ('user ' + user?.id)}
            </UserName>
            <Button type={'primary'} onClick={() => setIsEditingUserInfo(true)}><EditOutlined /></Button>
            <Popconfirm
                title="Logout from account"
                description="Are you sure to logout from account?"
                onConfirm={onLogout}
                okText="Yes"
                cancelText="No">
                <Button danger style={{'background':'#202024'}} ><LogoutOutlined /></Button>
            </Popconfirm>
          </Display>
        : <Display>
            <PhotosInputContainer>
              <UploadOutlined/>
              <PhotosInput type={'file'} onChange={onImageChange}/>
            </PhotosInputContainer>
            <Input defaultValue={user.displayName || ''} onChange={(e) => changeNameUserInfo(e.target.value)}/>
            <Button type="primary"  onClick={onConfirmEditUserInfo}>
              <CheckOutlined />
            </Button>
            <Button type={'dashed'} danger onClick={() => setIsEditingUserInfo(false)}>
              <CloseOutlined />
            </Button>
          </Display>}
    </Display>
}