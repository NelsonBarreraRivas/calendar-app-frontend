import { parseISO } from "date-fns";
import { Event } from "../calendar";

export const convertEvenstToDateEvents = ( events : any[] ) => {
    
    return events.map( event => {

        event.end = parseISO( event.end.toString() )
        event.start = parseISO( event.start.toString() )

        return event
    })

}