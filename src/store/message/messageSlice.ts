import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
    
} as { errorMessage: string | undefined, successMessage: string | undefined }

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        onErrorMessage: ( state, { payload } : PayloadAction<string> ) => {
            state.errorMessage = payload
        },
        onSuccessMessage: ( state, { payload } : PayloadAction<string> ) => {
            state.successMessage = payload
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined
        },
        clearSuccessMessage: ( state ) => {
            state.successMessage = undefined
        }
    }
})

export const { clearErrorMessage, clearSuccessMessage, onErrorMessage, onSuccessMessage} = messageSlice.actions
//export const messageReducer = message.reducer
