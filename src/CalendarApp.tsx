import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { useCheckAuth, useMessageStore } from "./hooks"
import { useEffect } from "react"
import { Spinner } from "./components"
import { toast } from "react-toastify"


export const CalendarApp = () => {

    const { errorMessage, successMessage } = useMessageStore()

    useEffect(() => {

        if (errorMessage !== undefined) {

            toast.error(errorMessage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: { textAlign: 'center' }
            });
        }

    }, [errorMessage])

    useEffect(() => {

        
        if (successMessage !== undefined) {

            toast.success(successMessage, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                style: { textAlign: 'center' }
            });
        }

    }, [successMessage])

    const { status } = useCheckAuth()

    if (status === 'checking' ) {
        return <Spinner type="spokes" height={80} width={80} color="#2563eb" />
    }
    return (

        <>
            <RouterProvider router={router} />
        </>

    )
}