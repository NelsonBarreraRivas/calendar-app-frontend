import { configureStore } from '@reduxjs/toolkit'
import { calendarSlice } from './calendar'
import { uiSlice } from './ui'
import { authSlice } from './auth'
import { messageSlice } from './message'


export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        auth: authSlice.reducer,
        message: messageSlice.reducer
    },
    middleware: ( getDefaultMiddleware ) => getDefaultMiddleware( {
        serializableCheck: false
    } )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch