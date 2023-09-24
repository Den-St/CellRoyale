import { BoosterT } from "./booster"

export type UserT = {
    email:string | null,
    createdAt?:string | null,
    displayName?:string | null,
    photoURL?:string | null,
    id?:string,
    location?:number[] | null,
    color?:string | null
    matchQueue?:string | null,
    rating?:number | null,
    numberOfWins?:number | null,
    numberOfMatches?:number | null,
    boosterStepsRemaining?:number | null,
    activeBooster?:BoosterT | null;
}

export type CreateUserT = {
    email?:string | null,
    createdAt?:string | null,
    displayName?:string | null,
    photoURL?:string | null,
}