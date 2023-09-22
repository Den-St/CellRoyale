import { Avatar, Button, Popconfirm, Row, Col, Statistic, Table, Tag, Spin } from "antd";
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
    return <></>
}