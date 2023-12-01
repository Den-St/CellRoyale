export type CreateMessageT = {
    sender:{id:string,displayName:string},
    match:string,
    text:string,
    isSystem:boolean
}