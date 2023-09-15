import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Timestamp } from "firebase/firestore";
import { UserT } from "../types/user";

const initialState:UserT = {
    email:'',
    createdAt:null,
    displayName:'',
    photoURL:'',   
    id:'',
    location:[],
    color:'',
    matchQueue:''
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
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;