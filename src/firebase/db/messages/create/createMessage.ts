import { addDoc } from "firebase/firestore";
import { CreateMessageT } from "../../../../types/createMessage";
import { messageCollection } from "../messagesCollection";

export const createMessage = async (data:CreateMessageT) => {
    try{
        await addDoc(messageCollection,
            {...data,
                createdAt:new Date()
            }
        );
    }catch(err){
        console.error(err);
    }
}