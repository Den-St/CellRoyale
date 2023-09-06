import { Timestamp } from "firebase/firestore";

export type UserT = {
    email:string | null,
    createdAt?:string | null,
    displayName?:string | null,
    photoURL?:string | null,
    id?:string,
}

export type CreateUserT = {
    email?:string | null,
    createdAt?:string | null,
    displayName?:string | null,
    photoURL?:string | null,
}