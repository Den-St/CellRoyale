export type UserT = {
    email:string | null,
    createdAt?:string | null,
    displayName?:string | null,
    photoURL?:string | null,
    id?:string,
    location?:number[] | null,
    color?:string | null
    matchQueue?:string | null,
    // isEliminated?:boolean | null,
    // isWinner?:boolean | null,
}

export type CreateUserT = {
    email?:string | null,
    createdAt?:string | null,
    displayName?:string | null,
    photoURL?:string | null,
}