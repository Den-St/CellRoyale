import { Timestamp } from 'firebase/firestore';

export type MatchT = {
    id?:string,
    activePlayer?:string,
    boosters?:string[],
    createdAt?:Timestamp,
    loadedPlayers?:string[],
    playersInQueue?:string[],
    alivePlayers?:string[],
    roundNumber?:number,
    creator?:string,
    numberOfPlayers?:number
}