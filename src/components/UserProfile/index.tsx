import { Avatar, Row, Col, Statistic, Table, Tag, Spin } from "antd";
import { Display } from "../../assets/Display";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useGetUser } from "../../hooks/getUser";
import { useGetMyLastMatches } from "../../hooks/getUsersLastMatches"
import { UserName } from "../MyProfile/styles";

export const UserProfile = () => {
    const {matches,loading} = useGetMyLastMatches();
    const {user,userLoading} = useGetUser();
    const dataSource = matches?.map(match => ({
        key:match.id,
        place:<Tag style={{fontSize:'15px'}} color={match.place === 1 ? 'success' : 'default'} >{match.place}</Tag>,
        date:match?.createdAt?.toDate().toLocaleDateString() + ' ' + match?.createdAt?.toDate().toLocaleTimeString()
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
    return <Display style={{flexDirection:'column',gap:'10px',width:'700px',background:'white',borderRadius:'20px',padding:'20px',height:'95%'}}>
        <Display style={{justifyContent:'space-between',alignItems:'center'}}>
            <Display style={{alignItems:'center',gap:'5px'}}>
                {!userLoading ? <>
                    <Avatar style={{width:'50px',height:'50px'}} src={user?.photoURL || defaultAvatar}/> 
                    <UserName>
                        {user?.displayName || ('user ' + user?.id)}
                    </UserName>
                </> : <Spin/>}
            </Display>
        </Display>
        <Row justify={'space-around'}>
            <Col>
                <Statistic title="Rating" value={user?.rating || 0} loading={userLoading}/>
            </Col>
            <Col >
                <Statistic title="Matches" value={user?.numberOfMatches || 0} loading={userLoading}/>
            </Col>
            <Col >
                <Statistic title="Victories" value={user?.numberOfWins || 0} loading={userLoading}/>
            </Col>
        </Row>
        <Display style={{overflowY:'scroll',width:'100%'}}>
            <Table style={{width:'100%'}} loading={loading} dataSource={dataSource} columns={columns} pagination={false}/>
        </Display>
    </Display>
}