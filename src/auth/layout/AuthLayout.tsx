
import { Outlet } from "react-router-dom"

import 'react-toastify/dist/ReactToastify.css';

export const AuthLayout = () => {


    console.log(import.meta.env.VITE_API_URL)

    return (
        <>

            <section className="bg-gray-100">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <main>
                                <Outlet />
                            </main>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
