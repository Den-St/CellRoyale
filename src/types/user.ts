import { Timestamp } from "firebase/firestore";

export type UserT = {
    email:string,
    createdAt:Timestamp,
    displayName?:string,
    photoURL?:string,
    id:string,
}

export type CreateUserT = {
    email?:string | null,
    createdAt?:string | null,
    displayName?:string | null,
    photoURL?:string | null,
}