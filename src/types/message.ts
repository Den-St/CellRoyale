import { Timestamp } from "firebase/firestore"

export type MessageT = {
    id:string,
    sender:{id:string,displayName:string},
    createdAt:Timestamp,
    isSystem:boolean,
    match:string,
    text:string
}