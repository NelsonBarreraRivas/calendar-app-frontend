import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { useCalendarStore, useUIStore } from '../../hooks'

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore()

    const { isDateModalOpen } = useUIStore()

    const handleClickDelete = () => {

        startDeleteEvent()
    }

    return (
        <button
            onClick={handleClickDelete}
            className="bg-red-500 z-[998] flex items-center transition-opacity justify-center hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-14 h-14 fixed bottom-4 left-4"
            style={{
                opacity: hasEventSelected && !isDateModalOpen ? '1' : '0'
            }}
        >
            <BsFillTrashFill size={20} />
        </button>
    )
}
