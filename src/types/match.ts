import { BoosterT } from './booster';
import { UserT } from './user';
import { Timestamp } from 'firebase/firestore';

export type MatchT = {
    id?:string,
    activePlayer?:UserT | null,
    boosters?:BoosterT[],
    createdAt?:Timestamp | null,
    loadedPlayers?:string[],
    playersInQueue?:string[],
    alivePlayers?:UserT[],
    roundNumber?:number,
    creator?:string,
    numberOfPlayers?:number
}