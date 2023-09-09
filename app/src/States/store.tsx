import { configureStore } from '@reduxjs/toolkit'
import diary from './Slice'

export const store =  configureStore({
    reducer:  { diary }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type reducers
export type AppDispatch = typeof store.dispatch;

