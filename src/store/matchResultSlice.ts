import { MatchResultT } from '../types/matchResult';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "../types/user";

const initialState:MatchResultT = {
   id:'',
   match:'',
   createdAt:null,
   playersPlaces:[],
   players:[]
}

const matchResultSlice = createSlice({
    name:'matchResult',
    initialState,
    reducers:{
        setMatchResult(state,payload:PayloadAction<MatchResultT>){
            state.id = payload?.payload.id;
            state.playersPlaces = payload?.payload.playersPlaces;
            state.match = payload?.payload.match;
            state.players = payload?.payload.players;
        },
        clearMatchResult(state,payload:PayloadAction){
            state.id = '';
            state.playersPlaces = [];
            state.match = '';
        }
    }
});

export const {setMatchResult} = matchResultSlice.actions;
export const {clearMatchResult} = matchResultSlice.actions;
export default matchResultSlice.reducer;