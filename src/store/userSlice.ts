import { BoosterT } from './../types/booster';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserT } from "../types/user";
import { BoosterTypeT } from '../types/boosterType';

const initialState:UserT = {
    email:'',
    createdAt:null,
    displayName:'',
    photoURL:'',   
    id:'',
    location:[],
    color:'',
    matchQueue:'',
    rating:0,
    numberOfWins:0,
    numberOfMatches:0,
    boosterStepsRemaining:0,
    activeBooster:null
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
            state.rating = payload?.payload.rating;
            state.numberOfMatches = payload?.payload.numberOfMatches;
            state.numberOfWins = payload?.payload.numberOfWins;
            state.activeBooster = payload?.payload.activeBooster;
            state.boosterStepsRemaining = payload?.payload.boosterStepsRemaining;
        },
        setPlayerMatchInfo(state,payload:PayloadAction<{location:number[],color:string}>){
            state.color = payload.payload.color;
            state.location = payload.payload.location;
        },
        setUserLocation(state,payload:PayloadAction<{location:number[]}>){
            state.location = payload.payload.location;
        },
        setNewRating(state,payload:PayloadAction<{newRating:number}>){
            state.rating = payload.payload.newRating;
        },
        setNewBooster(state,payload:PayloadAction<{boosterType:BoosterTypeT}>){
            state.boosterStepsRemaining = payload.payload.boosterType.duration;
            state.activeBooster = payload.payload.boosterType;
        },
        decrementBoosterStepsRemainingLocally(state){
            state.boosterStepsRemaining = (state?.boosterStepsRemaining || 0) - 1;
        },
        clearUserBooster(state){
            state.boosterStepsRemaining = 0;
            state.activeBooster = null
        }
    }
});

export const {setUser} = userSlice.actions;
export const {setPlayerMatchInfo} = userSlice.actions;
export const {setNewRating} = userSlice.actions;
export const {decrementBoosterStepsRemainingLocally} = userSlice.actions;
export const {setNewBooster} = userSlice.actions;
export const {setUserLocation} = userSlice.actions;
export const {clearUserBooster} = userSlice.actions;
export default userSlice.reducer;