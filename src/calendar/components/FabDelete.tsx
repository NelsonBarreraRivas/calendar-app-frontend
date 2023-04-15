import React from 'react'
import { BsFillTrashFill } from 'react-icons/bs'
import { useCalendarStore, useUIStore } from '../../hooks'

export const FabDelete = () => {

    const { startDeleteEvent, hasEventSelected } = useCalendarStore()
    const { closeDateModal } = useUIStore()


    const handleClickDelete = () => {
        closeDateModal()
        startDeleteEvent()
    }

    return (
        <button
            onClick={handleClickDelete}
            className="bg-red-500 z-[1000] flex items-center transition-opacity justify-center hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-12 h-12 sm:w-14 sm:h-14 fixed bottom-4 left-4"
            style={{
                opacity: hasEventSelected ? '1' : '0'
            }}
        >
            <BsFillTrashFill size={20} />
        </button>
    )
}
