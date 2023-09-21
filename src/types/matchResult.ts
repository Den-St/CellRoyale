import { Timestamp } from 'firebase/firestore';
export type MatchResultT = {
    id:string,
    match:string,
    playersPlaces:{player:string,place:number}[],
    createdAt?:Timestamp | null,
    players:string[],
}