import { Avatar, Table } from "antd"
import { Display } from "../../assets/Display"
import { UserNameLink } from "../../assets/UserNameLink";
import { defaultAvatar } from "../../consts/defaultAvatar";
import { useRating } from "../../hooks/rating.hook";

export const Rating = () => {
    const {loading,users} = useRating();
    const dataSource = users?.map((user,i) => {
        return {
            key:user.id,
            index:i + 1,
            player:<Display style={{gap:'10px'}}>
                <Avatar src={user.photoURL || defaultAvatar}/>
                <UserNameLink to={'/users/'+user.id}>{user.displayName}</UserNameLink>
            </Display>,
            numberOfMatches:user.numberOfMatches,
            numberOfWins: user.numberOfWins,
            rating: user.rating
        }
    });
      
    const columns = [
        {
            title: '№',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Player',
            dataIndex: 'player',
            key: 'player',
        },
        {
            title: 'Matches',
            dataIndex: 'numberOfMatches',
            key: 'numberOfMatches',
        },
        {
            title: 'Wins',
            dataIndex: 'numberOfWins',
            key: 'numberOfWins',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
        },
    ];
      
    return <Display style={{width:'520px',height:'100%',padding:'20px 0 0 20px',overflow:'scroll'}}>
        <Table pagination={false} loading={loading} dataSource={dataSource} columns={columns}/>
    </Display>
}