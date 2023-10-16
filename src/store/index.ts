import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import matchReducer from "./matchSlice";
import matchResultReducer from "./matchResultSlice";

export const store = configureStore({
    reducer: {
        user:userReducer,
        match:matchReducer,
        matchResult:matchResultReducer,
    },
    middleware:getDefaultMiddleware({
        immutableCheck:false,
        serializableCheck: false,
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;