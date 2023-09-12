import { BoosterT } from "./booster";
import { UserT } from "./user";

export type CellT = {type:'cell' | 'player' | 'booster' ,value:number | UserT | BoosterT};