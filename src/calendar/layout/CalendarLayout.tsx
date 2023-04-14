import { Outlet } from "react-router-dom"
import { Navbar } from "../components"
import { useCalendarStore } from "../../hooks"
import { Spinner } from "../../components"


export const CalendarLayout = () => {



    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}
