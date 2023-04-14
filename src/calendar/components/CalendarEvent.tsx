import { FC } from 'react';
import { EventProps, CalendarProps  } from 'react-big-calendar';

import { Event } from '../interfaces';

export const CalendarEvent : FC<CalendarProps> = ( props ) => {

    const { event, continuesAfter, continuesPrior, isAllDay, localizer, slotEnd, slotStart, title  } = props as EventProps<Event>
    const { user } = event 
    return (
        <div>
            <strong>{ title }</strong>
            <span> - { user.name }</span>
        </div>
    )
}
