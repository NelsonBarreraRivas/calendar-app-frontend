import { calendarApi } from "../api"
import { clearEventsLogout, useAppDispatch, useAppSelector } from "../store"
import { onChecking, onLogin, onLogout } from "../store/auth"
import { Login, Register } from "../store/interfaces"
import { clearErrorMessage, onErrorMessage } from "../store/message"

export const useAuthStore = () => {

    const dispatch = useAppDispatch()

    const { status, errorMessage, user } = useAppSelector( state => state.auth )
    

    const startLogin = async ( { email, password } : Login ) => {
    
        dispatch( onChecking() )

        try {
            const { data } = await calendarApi.post('auth', { email, password })
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toString() )

            dispatch( onLogin( { name: data.name, uid: data.uid } ) )
            
        } catch (error) {
            console.error(error)

            dispatch( onErrorMessage('Credenciales Incorrectas') )
            dispatch( onLogout() )

            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);
        }
    }

    const startRegister = async ( { name, email, password  } : Register) => {

        dispatch( onChecking() )

        try {
            const { data } = await calendarApi.post('auth/new', { email, password, name })
            
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toString() )

            dispatch( onLogin( { name: data.name, uid: data.uid } ) )
            
        } catch (error: any) {
            console.error(error)


            dispatch( onErrorMessage( error.response.data?.msg || '--' ) )
            dispatch( onLogout() )

            setTimeout(() => {
                dispatch( clearErrorMessage() )
            }, 10);
        }
    }

    const checkAuthToken = async () => {

        const token = localStorage.getItem('token')

        if( !token )  return dispatch( onLogout() )

        try {
            const { data } = await calendarApi.get('auth/renew') 

            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime().toString() )

            dispatch( onLogin( { name: data.name, uid: data.uid } ) )

        } catch (error: any) {

            console.error(error)

            localStorage.clear()

            dispatch( onLogout() )
        }
    }

    const startLogout = () => {
        localStorage.clear()
        dispatch( clearEventsLogout() )
        dispatch( onLogout() )
    }

    return {
        startLogin,
        errorMessage,
        startRegister,
        checkAuthToken,
        status,
        startLogout,
        user
    }
}