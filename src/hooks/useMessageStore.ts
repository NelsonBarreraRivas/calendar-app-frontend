import { useAppSelector } from "../store"

export const useMessageStore = () => {

    const { errorMessage, successMessage } = useAppSelector( state => state.message )

    return {
        errorMessage, 
        successMessage,
    }
}