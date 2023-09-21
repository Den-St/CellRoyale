import { Avatar, Button, Col, Input, Popconfirm, Row, Statistic, Table } from "antd";
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
import { Navigate } from "react-router-dom";

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
    const dataSource = matches?.map(match => ({
      key:match.id,
      place:match.place,
      date:match.createdAt
    }));
    const columns = [
      {
          title: 'Place',
          dataIndex: 'place',
          key: 'place',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
    ]; 

    if(logout) return <Navigate to={'/registration'}/>
    return <Display style={{flexDirection:'column',gap:'10px',width:'700px',background:'white',borderRadius:'20px',padding:'20px'}}>
        {!isEditingUserInfo 
        ? <Display style={{justifyContent:'space-between',alignItems:'center'}}>
            <Display style={{alignItems:'center',gap:'5px'}}>
              <Avatar style={{width:'50px',height:'50px'}} src={newImage ? URL.createObjectURL(newImage) : user.photoURL || defaultAvatar}/> 
              <UserName>
                  {user?.displayName || ('user ' + user?.id)}
              </UserName>
              <Button type={'primary'} onClick={() => setIsEditingUserInfo(true)}><EditOutlined /></Button>
            </Display>
            <Popconfirm
                title="Logout from account"
                description="Are you sure to logout from account?"
                onConfirm={onLogout}
                okText="Yes"
                cancelText="No">
                <Button danger style={{'background':'white'}} ><LogoutOutlined /></Button>
            </Popconfirm>
          </Display>
        : <Display style={{alignItems:'center',gap:'5px'}}>
            <PhotosInputContainer>
              <UploadOutlined/>
              <PhotosInput type={'file'} onChange={onImageChange}/>
            </PhotosInputContainer>
            <Input style={{width:'200px'}} defaultValue={user.displayName || ''} onChange={(e) => changeNameUserInfo(e.target.value)}/>
            <Button type="primary"  onClick={onConfirmEditUserInfo}>
              <CheckOutlined />
            </Button>
            <Button type={'dashed'} danger onClick={() => setIsEditingUserInfo(false)}>
              <CloseOutlined />
            </Button>
          </Display>}
          <Row justify={'space-around'}>
                <Col>
                    <Statistic  title="Rating" value={user.rating || 0} loading={loading}/>
                </Col>
                <Col >
                    <Statistic  title="Jobs" value={user.numberOfMatches || 0} loading={loading}/>
                </Col>
                <Col >
                    <Statistic  title="Fdsfsd" value={user.numberOfMatches || 0} loading={loading}/>
                </Col>
        </Row>
        <Table dataSource={dataSource} columns={columns} pagination={false}/>
    </Display>
}