import { configureStore } from '@reduxjs/toolkit';
import diary from './Slice';
import getDiary from './diarySlice';
import getMenuOpener from './menuSlice';
import getStatus from './statusSlice';
import getInput from './savingInput';
import getImageUrl from './imageUrl';


export const store =  configureStore({
    reducer:  
       {
         diary, 
         getDiary,
         getMenuOpener,
         getStatus,
         getInput,
         getImageUrl
      }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type reducers
export type AppDispatch = typeof store.dispatch;

