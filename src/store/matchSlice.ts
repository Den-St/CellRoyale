import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MatchT } from "../types/match";

const initialState:MatchT = {
    id:'',
    activePlayer:null,
    boosters:[],
    loadedPlayers:[],
    playersInQueue:[],
    alivePlayers:[],
    roundNumber:0,
    creator:'',
    numberOfPlayers:0
}

const matchSlice = createSlice({
    name:'match',
    initialState,
    reducers:{
        setMatch(state,payload:PayloadAction<MatchT>){
            state.id = payload.payload.id;
            state.activePlayer = payload.payload.activePlayer;
            state.boosters = payload.payload.boosters;
            state.loadedPlayers = payload.payload.loadedPlayers;
            state.playersInQueue = payload.payload.playersInQueue;
            state.alivePlayers = payload.payload.alivePlayers;
            state.roundNumber = payload.payload.roundNumber;
            state.creator = payload.payload.creator;
            state.numberOfPlayers = payload.payload.numberOfPlayers;
        }
    }
});

export const {setMatch} = matchSlice.actions;
export default matchSlice.reducer;