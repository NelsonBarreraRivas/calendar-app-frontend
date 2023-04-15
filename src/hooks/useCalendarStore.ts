import { calendarApi } from "../api";
import { Event } from "../calendar";
import { convertEvenstToDateEvents } from "../helpers/convertEvenstToDateEvents";
import {onLogout, useAppDispatch, useAppSelector } from "../store"
import { clearActiveEvent, onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar";
import { EventResponse } from "../store/interfaces";
import { clearErrorMessage, clearSuccessMessage, onErrorMessage, onSuccessMessage } from "../store/message";

export const useCalendarStore = () => {

    const { events, activeEvent , isLoadingEvent} = useAppSelector(state => state.calendar)

    const { user } = useAppSelector(state => state.auth)

    const dispatch = useAppDispatch()

    const setActiveEvent = (calendarEvent: Event) => {

        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async (calendarEvent: Event) => {

        try {

            if (calendarEvent.id) {

                await calendarApi.put<EventResponse>(`/events/${calendarEvent.id}`, calendarEvent)

                
                dispatch(onUpdateEvent({ ...calendarEvent, user }))
                
                dispatch( onSuccessMessage('Evento actualizado!') )
                setTimeout(() => {
                    dispatch( clearSuccessMessage() )
                }, 10);
    
                return
            }
            const { data } = await calendarApi.post<EventResponse>('/events', calendarEvent)
    
            // ? creando

            dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
            dispatch( onSuccessMessage('Evento creado!') )
            
            setTimeout(() => {
                dispatch( clearSuccessMessage() )
            }, 10);

        } catch (error: any) {

            console.error(error)


            localStorage.clear()

            dispatch( onErrorMessage( error.response.data.msg ) )

            dispatch(onLogout())


            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);
        }

    }

    const startDeleteEvent = async () => {

        try {

            await calendarApi.delete(`/events/${ activeEvent.id }`)


            dispatch( onDeleteEvent() )

            dispatch( onErrorMessage('Evento Eliminado!') )

            dispatch( clearActiveEvent() )
            
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);


        } catch (error : any) {
            console.error(error)

            localStorage.clear()

            
            dispatch( onLogout() )
            
            dispatch( onErrorMessage( error.response.data.msg ) )
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);
        }
    }


    const startLoadingEvents = async () => {


        try {

            const { data } = await calendarApi.get('/events')

            const events = convertEvenstToDateEvents(data.events)
            
            dispatch(onLoadEvents(events))


        } catch (error) {

            console.error(error)

            
            dispatch( onLogout() )
            
            dispatch( onErrorMessage( 'Upps hubo un error!!!') )
            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);
        }
    }

    const startClearActiveEvent = () => {
        dispatch( clearActiveEvent() )
    }

    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent.id,
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents,
        isLoadingEvent,
        startClearActiveEvent
    }

}