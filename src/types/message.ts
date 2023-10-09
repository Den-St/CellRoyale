import { Timestamp } from "firebase/firestore"

export type MessageT = {
    id:string,
    sender:string,
    createdAt:Timestamp,
    isSystem:boolean,
    match:string,
    text:string
}