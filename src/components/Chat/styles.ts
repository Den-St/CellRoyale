import { styled } from "styled-components";

export const ChatContainer = styled.div`
    width:100%;
    height:300px;
    border-radius:10px;
    border:1px solid white;
    padding:5px 10px;
    box-sizing:border-box;
`;

export const MessagesContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:5px;
    height: 260px;
    overflow-y:scroll;
`;

export const MessageItemContainer = styled.div<{$isMineMessage:boolean}>`
    display:flex;
    gap:3px;
    align-items:center;
    ${({$isMineMessage}) => $isMineMessage && `align-self:flex-end`};
`;
export const MessageText = styled.div`
    border-radius:10px;
    background:lightblue;
    padding:3px 5px;
    width:fit-content;
`;
export const SystemMessage = styled.div`
    width:100%;
    display:flex;
    justify-content:center;
    gap:10px;
`;
export const MessageControllerContainer = styled.form`
    display:flex;
    gap:5px;
    align-item:center;
    width:100%;
    margin-top:5px;
`;

export const MessageInput = styled.input`
    width:80%;
`;

export const MessageSendButton = styled.input`
    background:#1677ff;;
    border:none;
    outline:none;
    border-radius:5px;
    color:white;
`;