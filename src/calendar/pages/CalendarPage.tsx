import { Calendar, CalendarProps, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { getColorByDayOfWeek, getMessagesES, isMovil, localizer } from '../../helpers';
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '../components';
import { Event } from '../interfaces';
import { useEffect, useState } from 'react';
import { useCalendarStore, useUIStore } from '../../hooks';
import { Spinner } from '../../components';



export const CalendarPage = () => {

    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()

    const { openDateModal } = useUIStore()
    const getLastView = (localStorage.getItem('lastView') || 'month') as View

    const [lastView, setLastView] = useState<View>(getLastView)

    const eventStyleGetter: CalendarProps<Event>['eventPropGetter'] = (event, start, end, isSelected) => {

        const backgroundColor = getColorByDayOfWeek(start); 

        const style = {
            color: 'white',
            backgroundColor,
            opacity: 0.8,
            border: 'none',
            display: 'block',
            UserSelect : 'none'
        }

        return {
            className: 'bg-primary-500',
            style
        };
    }

    const onDoubleClick = (event: Event) => {
        //console.log({ doubleClick: event });
        openDateModal()
    }

    const onSelect = (event: Event) => {
        if (isMovil()) {
            setActiveEvent(event)
            openDateModal()
        } else {
            setActiveEvent(event)
        }
    }

    const onViewChanged = (view: View) => {
        localStorage.setItem('lastView', view)
    }

    useEffect(() => {

        startLoadingEvents()

    }, [])


    return (
        <>
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc( 100vh - 64px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />

            <FabAddNew />

            <FabDelete />

            <CalendarModal />
        </>
    )
}
