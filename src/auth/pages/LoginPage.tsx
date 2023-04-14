import { Link } from "react-router-dom"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useEffect, useState } from "react";
import { useAuthStore } from "../../hooks";
import { toast } from "react-toastify";


const validationSchemaLogin = Yup.object({
    email: Yup
        .string()
        .email('Por favor, introduce una dirección de correo electrónico válida.')
        .required('Por favor, introduce una dirección de correo electrónico válida.'),
    password: Yup
        .string()
        .min(6, 'La contraseña es demasiado corta, debe tener un mínimo de 6 caracteres')
        .required('La contraseña es demasiado corta, debe tener un mínimo de 6 caracteres')
})

export const LoginPage = () => {

    const { startLogin } = useAuthStore()

    const [submit, setSubmit] = useState<boolean>(false)


    const initialValues = {
        email: '',
        password: ''
    }

    const { handleChange, handleSubmit, values, errors, isValid, dirty } = useFormik({
        initialValues,
        validationSchema: validationSchemaLogin,
        onSubmit: values => {

            startLogin( values )
        },
        validateOnChange: submit,
        validateOnBlur: false
    })
    
    return (

        <>
            <h1 className="text-xl mb-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Inicia Sesión
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Tu email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className={`bg-gray-50 focus:outline-none border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg ${errors.email ? 'focus:border-red-600' : 'focus:border-primary-600'} block w-full p-2.5`}
                        placeholder="name@company.com"
                        onChange={handleChange}
                        value={values.email}
                        required
                    />
                    {errors.email && (
                        <p className="text-red-500 font-semibold text-sm">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Tu Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        className={`bg-gray-50 focus:outline-none border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg ${errors.password ? 'focus:border-red-600' : 'focus:border-primary-600'} block w-full p-2.5`}
                        placeholder="••••••••"
                        onChange={handleChange}
                        value={values.password}
                        required
                    />
                    {errors.password && (
                        <p className="text-red-500 font-semibold text-sm">{errors.password}</p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500">Recuerdame</label>
                        </div>
                    </div>
                    {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a> */}
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => setSubmit(true)}
                    disabled={!dirty || !isValid}
                >Ingresar</button>

                <p className="text-sm font-light text-gray-900 flex justify-end">
                    Aún no tienes cuenta? <Link to={'/auth/register'} className={'font-medium underline text-primary-600 hover:underline dark:text-primary-500 ml-2'}>registrate</Link>
                </p>
            </form>
        </>

    )
}