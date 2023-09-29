import { createSlice } from "@reduxjs/toolkit";
import { accountInfoState } from '../utils/reduxTypes'

const initialState: accountInfoState = {
    value: {
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      ProfileDisplay: '', // Initialize with default value
    },
  };


export const saveAccountInput = createSlice( {
    name: 'saveAccount',
    initialState,
    reducers: {
        saveAccount: (state, action) => {
             state.value = action.payload
        },
     }
})


export const { saveAccount } = saveAccountInput.actions
export default saveAccountInput.reducer;