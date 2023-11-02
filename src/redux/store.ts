import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slices/user.slice.ts";

const store = configureStore({
    reducer: {
        user: userSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisptach = typeof store.dispatch

export default store