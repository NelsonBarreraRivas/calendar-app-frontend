import { Link } from "react-router-dom"
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useState } from "react";
import { useAuthStore } from "../../hooks";

const validationSchemaRegister = Yup.object({
    name: Yup
        .string()
        .min(3, 'Por favor ingrese su nombre (mínimo de 2 caracteres).')
        .max(200, 'Por favor ingrese su nombre (límite de 200 caracteres).')
        .required('Por favor ingrese su nombre (límite de 200 caracteres).'),
    email: Yup
        .string()
        .email('Por favor, introduce una dirección de correo electrónico válida.')
        .required('Por favor, introduce una dirección de correo electrónico válida.'),
    password: Yup
        .string()
        .min(6, 'La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres')
        .required('La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres'),
    repeatPassword: Yup
        .string()
        .min(6, 'La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres')
        .required('La contraseña es demasiado corta, debe tener un mínimo de 8 caracteres')
        .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir'),
})

export const RegisterPage = () => {

    const { startRegister } = useAuthStore()

    const [submit, setSubmit] = useState<boolean>(false)

    const initialValues = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    }

    const { handleSubmit, values, errors, handleChange, isValid, dirty } = useFormik({
        initialValues,
        validationSchema: validationSchemaRegister,
        onSubmit: values => {
            startRegister( values )
        },
        validateOnChange: submit,
        validateOnBlur: false
    })

    return (
        <>

            <h1 className="text-xl mb-2 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center">
                Registrate
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Tu nombre</label>
                    <input
                        type="text"
                        name="name" id="name"
                        className={`bg-gray-50 focus:outline-none border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg ${errors.name ? 'focus:border-red-600' : 'focus:border-primary-600'} block w-full p-2.5`}
                        placeholder="Nelson Barrera"
                        onChange={handleChange}
                        value={values.name}
                        required
                    />
                    {errors.name && (
                        <p className="text-red-500 font-semibold text-sm">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Tu email</label>
                    <input
                        type="email"
                        name="email" id="email"
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
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input
                        type="password"
                        name="password" id="password"
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
                <div>
                    <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900">Repetir Password</label>
                    <input
                        type="password"
                        name="repeatPassword" id="repeatPassword"
                        className={`bg-gray-50 focus:outline-none border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg ${errors.repeatPassword ? 'focus:border-red-600' : 'focus:border-primary-600'} block w-full p-2.5`}
                        placeholder="••••••••"
                        onChange={handleChange}
                        value={values.repeatPassword}
                        required
                    />
                    {errors.repeatPassword && (
                        <p className="text-red-500 font-semibold text-sm">{errors.repeatPassword}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => setSubmit(true)}
                    disabled={!dirty || !isValid}
                >Registrar</button>


                <p className="text-sm font-light text-gray-900 flex justify-end">
                    Yá tienes cuenta? <Link to={'/auth/login'} className={'font-medium text-primary-600 underline dark:text-primary-500 ml-2'}>ingresa</Link>
                </p>
            </form>
        </>
    )
}
