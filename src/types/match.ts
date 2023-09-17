import { BoosterT } from './booster';
import { UserT } from './user';

export type MatchT = {
    id?:string,
    activePlayer?:UserT | null,
    boosters?:BoosterT[],
    loadedPlayers?:string[],
    playersInQueue?:string[],
    alivePlayers?:UserT[],
    roundNumber?:number,
    creator?:string,
    numberOfPlayers?:number
}