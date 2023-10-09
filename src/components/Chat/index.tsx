import { Tag } from "antd"
import { ChatContainer, MessagesContainer, MessageItemContainer, SystemMessage, MessageControllerContainer, MessageInput, MessageSendButton } from "./styles"
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { useChat } from "../../hooks/chat";
import { useAppSelector } from "../../hooks/redux";
import { useForm } from "react-hook-form";

type Props = {
    matchId:string
}

export const Chat:React.FC<Props> = ({matchId}) => {
    const {loading,messages,onCreateMessage,setText,text} = useChat(matchId);
    const myId = useAppSelector(state => state).user.id;
    const {
        handleSubmit,
    } = useForm<{text:string}>();

    return <ChatContainer>
        <MessagesContainer>
            {
                messages.map(message => message.isSystem 
                ? <SystemMessage key={message.id}><Tag color={'warning'} icon={<ExclamationCircleOutlined/>}>{message.text}</Tag></SystemMessage>
                : <MessageItemContainer key={message.id} $isMineMessage={message.sender === myId}>{message.text}</MessageItemContainer>)
            }
        </MessagesContainer>
        <MessageControllerContainer onSubmit={handleSubmit(onCreateMessage)}>
            <MessageInput onChange={(e) => setText(e.target.value)} value={text}/>
            <MessageSendButton type={'submit'} value={'Send'}/>
        </MessageControllerContainer>
    </ChatContainer>
}