import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "../types/user";

const initialState:UserT = {
    email:'',
    createdAt:null,
    displayName:'',
    photoURL:'',   
    id:'',
    location:[],
    color:'',
    matchQueue:'',
    // isEliminated:false,
    // isWinner:true
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,payload:PayloadAction<UserT>){
            state.email = payload?.payload.email;
            state.createdAt = payload?.payload.createdAt;
            state.displayName = payload?.payload.displayName;
            state.photoURL = payload?.payload.photoURL;
            state.id = payload?.payload.id;
            state.location = payload?.payload.location;
            state.color = payload?.payload.color;
            state.matchQueue = payload?.payload.matchQueue;
            state.matchQueue = payload?.payload.matchQueue;
        },
        clearPlayersMatchInfo(state){
            // state.color = '';
            // state.location = [];
        },
        setPlayerMatchInfo(state,payload:PayloadAction<{location:number[],color:string}>){
            state.color = payload.payload.color;
            state.location = payload.payload.location;
        }
    }
});

export const {setUser} = userSlice.actions;
export const {clearPlayersMatchInfo} = userSlice.actions;
export const {setPlayerMatchInfo} = userSlice.actions;
export default userSlice.reducer;