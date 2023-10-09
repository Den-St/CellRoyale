import { styled } from "styled-components";

export const ChatContainer = styled.div`
    width:100%;
    height:400px;
    border-radius:10px;
    border:1px solid white;
    padding:5px;
   
`;

export const MessagesContainer = styled.div`
    display:flex;
    flex-direction:column;
    gap:5px;
    height: 93%;
    overflow-y:scroll;
`;

export const MessageItemContainer = styled.div<{$isMineMessage:boolean}>`
    border-radius:10px;
    background:lightblue;
    padding:3px 5px;
    width:fit-content;
    ${({$isMineMessage}) => $isMineMessage && `align-self:flex-end`};
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
`;

export const MessageInput = styled.input`

`;

export const MessageSendButton = styled.input`
    background:blue;
    border:none;
    outline:none;
    border-radius:5px;
    color:white;
`;