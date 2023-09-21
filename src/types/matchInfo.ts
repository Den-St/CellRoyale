import { Timestamp } from "firebase/firestore";

export type MatchInfoT = {
    id:string,
    place:number,
    createdAt?:Timestamp | null,
}