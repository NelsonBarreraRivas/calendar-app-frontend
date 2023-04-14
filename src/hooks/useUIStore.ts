import { onCloseDateModal, onOpenDateModal, useAppDispatch, useAppSelector } from "../store"

export const useUIStore = () => {

    const dispatch = useAppDispatch()

    const { isDateModalOpen } = useAppSelector( state => state.ui )

    const openDateModal = () => {
        dispatch( onOpenDateModal() )
    }
    const closeDateModal = () => {
        dispatch( onCloseDateModal() )
    }
    
    return {
        isDateModalOpen,
        closeDateModal,
        openDateModal
    }

}