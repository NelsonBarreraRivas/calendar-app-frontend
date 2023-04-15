
import { BsPlusLg } from "react-icons/bs"
import { useCalendarStore, useUIStore } from "../../hooks"

export const FabAddNew = () => {

    const { openDateModal } = useUIStore()
    const { startClearActiveEvent } = useCalendarStore()


    const handleClickNew = () => {
        startClearActiveEvent()
        openDateModal()
    }

    return (
        <button
            onClick={handleClickNew}
            className="bg-blue-500 z-[998] flex items-center justify-center hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-14 h-14 fixed bottom-4 right-4"
        >
            <BsPlusLg size={20} />
        </button>
    )
}
