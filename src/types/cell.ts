import { BoosterT } from "./booster";
import { UserT } from "./user";

export type CellTypeT = 'cell' | 'player' | 'booster'
export type CellT = {type:CellTypeT ,value:number | UserT | BoosterT,isAvailable:boolean};