import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';
import { Event } from "../../calendar/interfaces";


const initialState = {
    events: [] as Event[],
    activeEvent: {} as Event,
    isLoadingEvent: true
}

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onSetActiveEvent: (state, { payload }: PayloadAction<Event>) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, { payload }: PayloadAction<Event>) => {
            state.events.push(payload)
            state.activeEvent = {} as Event
        },
        onUpdateEvent: (state, { payload }: PayloadAction<Event>) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload
                }
                return event
            })
            state.activeEvent = {} as Event
        },
        onDeleteEvent: (state) => {
            if (Object.values(state.activeEvent).length) {
                
                state.events = state.events.filter(event => {
                    return event.id !== state.activeEvent.id
                })
                state.activeEvent = {} as Event
            }
        },
        onLoadEvents: ( state, { payload } : PayloadAction<any[]> ) => {
            state.isLoadingEvent = false
            //state.events = payload
            payload.forEach( (event : any) => {

                const exists = state.events.some( dbEvent => dbEvent.id === event.id )

                if( !exists ) state.events.push( event )

            })
        },
        clearEventsLogout : ( state ) => {
            state.events = []
            state.activeEvent = {} as Event
        },
        clearActiveEvent: ( state ) => {
            state.activeEvent = {} as Event
        }
    },

})

export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, clearEventsLogout, clearActiveEvent } = calendarSlice.actions
//export const calendarReducer = calendarSlice.reducer
