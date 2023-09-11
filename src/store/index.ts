import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import matchReducer from "./matchSlice";

export const store = configureStore({
    reducer: {
        user:userReducer,
        match:matchReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;