import { MatchResultT } from '../types/matchResult';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "../types/user";

const initialState:MatchResultT = {
   id:'',
   match:'',
   createdAt:'',
   players:[]
}

const matchResultSlice = createSlice({
    name:'matchResult',
    initialState,
    reducers:{
        setMatchResult(state,payload:PayloadAction<MatchResultT>){
            state.id = payload?.payload.id;
            state.players = payload?.payload.players;
            state.match = payload?.payload.match;
        },
        clearMatchResult(state,payload:PayloadAction){
            state.id = '';
            state.players = [];
            state.match = '';
        }
    }
});

export const {setMatchResult} = matchResultSlice.actions;
export const {clearMatchResult} = matchResultSlice.actions;
export default matchResultSlice.reducer;