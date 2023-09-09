export type BoosterT = {
    id:string,
    location:number[],
    type:string
}

export type CreateBoosterT = {
    location:number[],
    type:string,
    // match:string
}