import { configureStore } from '@reduxjs/toolkit'
import diary from './Slice'
import getDiary from './diarySlice'

export const store =  configureStore({
    reducer:  
       {
         diary, 
         getDiary
      }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type reducers
export type AppDispatch = typeof store.dispatch;

