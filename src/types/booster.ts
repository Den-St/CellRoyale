import { BoosterTypeT } from "./boosterType"

export type BoosterT = {
    id:string,
    location:number[],
    type:BoosterTypeT,
}

export type CreateBoosterT = {
    location:number[],
    type:string,
    // match:string
}