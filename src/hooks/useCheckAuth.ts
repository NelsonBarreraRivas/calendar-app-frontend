import { useEffect } from "react"
import { useAuthStore } from "./useAuthStore"

export const useCheckAuth = () => {

    const { checkAuthToken, status } = useAuthStore()

    useEffect(() => {

        checkAuthToken()

    }, [])

    return {
        status
    }
}