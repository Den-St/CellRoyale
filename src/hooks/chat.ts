import { useAppSelector } from './redux';
import { createMessage } from './../firebase/db/messages/create/createMessage';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { messageCollection } from '../firebase/db/messages/messagesCollection';
import { MessageT } from '../types/message';

export const useChat = (matchId:string) => {
    const myId = useAppSelector(state => state).user.id;

    const [messages,setMessages] = useState<MessageT[]>([]);
    const [loading,setLoading] = useState<{messages:boolean,create:boolean}>({create:false,messages:false});
    const q = query(messageCollection,where('match','==',matchId),orderBy('createdAt','asc'));
    const [text,setText] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(q,async (doc) => {
            setLoading(prev => ({...prev,messages:true}));
            const docs = doc.docs;

            const _messages = docs.map(d => d.data());
            
            _messages.forEach((message,i) => {
                message.id = docs[i].id;
            });
            setMessages(_messages as MessageT[]);
        });
        setLoading(prev => ({...prev,messages:false}));
        return () => unsubscribe();
    },[]);
    
    const onCreateMessage = async () => {
        setLoading(prev => ({...prev,create:true}));
        await createMessage({
            sender:myId || '',
            match:matchId,
            isSystem:false,
            text
        })
        setText('');
        setLoading(prev => ({...prev,create:false}));
    };

    return {loading,messages,onCreateMessage,setText,text}
}