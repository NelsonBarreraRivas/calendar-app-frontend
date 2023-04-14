import { useEffect, useState } from "react";
import Modal from "react-modal";
import { BsCalendarPlus } from "react-icons/bs";
import { addHours, setHours, setMinutes } from "date-fns";
import { FormikState, useFormik } from "formik";
import * as Yup from 'yup'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useCalendarStore, useUIStore } from "../../hooks";
import { Event } from "../interfaces";

registerLocale('es', es)



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
    },
};

Modal.setAppElement('#root');



export const CalendarModal = () => {

    const [submit, setSubmit] = useState<boolean>(false)

    const { isDateModalOpen, closeDateModal } = useUIStore()

    const { activeEvent, startSavingEvent, setActiveEvent } = useCalendarStore()

    const initialValues = {
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    } as Event

    const validationSchema = Yup.object().shape({
        title: Yup
            .string()
            .min(2, 'Por favor ingrese un titulo (mínimo de 2 caracteres).')
            .required('Por favor ingrese un titulo.'),
        notes: Yup
            .string()
            .required('Por favor ingrese una nota.'),
        start: Yup
            .date()
            .max(Yup.ref('end'), 'La fecha de inicialización debe ser anterior a la fecha fin.')
            .required('La fecha inicio es obligatoria.'),
        end: Yup
            .date()
            .min(Yup.ref('start'), 'La fecha de finalización debe ser posterior a la fecha inicio.')
            .required('La fecha fin es obligatoria.'),
    });


    const { resetForm, values, handleSubmit, handleChange, setFieldValue, errors, isValid, dirty, setFormikState } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            //alert(JSON.stringify(values, null, 2));
            startSavingEvent( values )
            closeDateModal()
            resetForm()
            setSubmit( false )
            
        },
        validateOnChange: submit,
        validateOnBlur: false
    })


    const minTime = values.start && setHours(setMinutes(new Date(), values.start.getMinutes()), values.start.getHours())
    const maxTime = values.start && setHours(setMinutes(new Date(), 59), 23)

    const onCloseModal = () => {
        closeDateModal()
        resetForm()
        setSubmit( false )
        setActiveEvent( {} as Event )
    }

    useEffect(() => {
        if( Object.keys(activeEvent).length){
            setFormikState( (event : FormikState<Event>) => ({
                ...event,
                values: {
                    ...event.values,
                    ...activeEvent
                }
            }) )
        }
    }, [activeEvent])
    

    return (
        <Modal
            isOpen={ isDateModalOpen }
            //onAfterOpen={afterOpenModal}
            onRequestClose={ onCloseModal }
            style={customStyles}
            className={'modal'}
            overlayClassName={'modal-fondo'}
            //closeTimeoutMS={100}
        >
            <h1 className="text-xl font-bold"> Nuevo evento </h1>
            <hr className="block my-3" />
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="start" className="block text-sm font-medium text-gray-900">Fecha y hora inicio</label>
                    <DatePicker
                        maxDate={values.end}
                        name="start"
                        id="start"
                        selected={values.start}
                        className={`bg-gray-50 focus:outline-none border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5`}
                        onChange={(date) => {
                            setFieldValue('start', date);
                        }}
                        dateFormat={'Pp'}
                        showTimeSelect
                        locale={'es'}
                        timeCaption={'Hora'}
                    />
                    {errors.start && (
                        <p className="text-red-500 font-semibold text-sm">{errors.start as string}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="end" className="block text-sm font-medium text-gray-900">Fecha y hora fin</label>
                    <DatePicker
                        minDate={values.start}
                        minTime={minTime}
                        maxTime={maxTime}
                        name="end"
                        id="end"
                        selected={values.end}
                        className={`bg-gray-50 focus:outline-none border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5`}
                        onChange={(date) => {
                            setFieldValue('end', date);
                        }}

                        dateFormat={'Pp'}
                        showTimeSelect
                        locale={'es'}
                        timeCaption={'Hora'}
                    />

                    {errors.end && (
                        <p className="text-red-500 font-semibold text-sm">{errors.end as string}</p>
                    )}
                </div>

                <hr />

                <div>
                    <div className="flex justify-between">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-900">Titulo</label><small className="italic underline">Una descripción corta</small>
                    </div>
                    <input
                        type="text"
                        className={`bg-gray-50 focus:outline-none border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5`}
                        placeholder="Título del evento"
                        name="title"
                        id="title"
                        autoComplete="off"
                        onChange={handleChange}
                        value={values.title}
                    />
                    {errors.title && (
                        <p className="text-red-500 font-semibold text-sm">{errors.title}</p>
                    )}
                </div>

                <div>
                    <div className="flex justify-between">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-900">Notas</label><small className="italic underline">Información adicional</small>
                    </div>
                    <textarea
                        className={`bg-gray-50 resize-none focus:outline-none border-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5`}
                        placeholder="Notas"
                        rows={5}
                        name="notes"
                        id="notes"
                        onChange={handleChange}
                        value={values.notes}
                    ></textarea>
                    {errors.notes && (
                        <p className="text-red-500 font-semibold text-sm">{errors.notes}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full flex justify-center gap-2 text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled={!(isValid && dirty)}
                    onClick={() => setSubmit(true)}
                >
                    <BsCalendarPlus size={20} /> Guardar
                </button>
            </form>
        </Modal>
    )
}
