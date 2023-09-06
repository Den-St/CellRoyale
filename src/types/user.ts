import { Timestamp } from "firebase/firestore";

export type UserT = {
    email:string,
    createdAt:Timestamp,
    displayName?:string,
    photoURL?:string,
    id:string,
}