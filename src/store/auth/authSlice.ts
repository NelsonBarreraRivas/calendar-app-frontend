import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { initialStateAuth } from '../interfaces'

const initialState = {
    status: 'checking',
} as initialStateAuth

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking'
            state.user = {} as { name: string, uid: string }
            state.errorMessage = undefined
        },
        onLogin : ( state, { payload } : PayloadAction<{[key: string]: string}>) => {
            state.status = 'authenticated'
            state.user = payload as { name: string, uid: string }
            state.errorMessage= undefined
        },
        onLogout: ( state ) => {
            state.status= 'not-authenticated'
            state.user= {} as { name: string, uid: string }
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined
        }
    }
})

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions
//export const authReducer = authSlice.reducer
