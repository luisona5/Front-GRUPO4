import { useEffect, useState } from "react"
import TableTreatments from "../components/treatments/Table"
import ModalTreatments from "../components/treatments/Modal"
import { useParams } from "react-router"
import useFetch from "../hooks/useFetch"

const Details = () => {
    const { id } = useParams()
    const [studient, setStudient] = useState({})
    const [ Sport, setSport] = useState([])
    const { fetchDataBackend } = useFetch()

    const listStudient = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/${id}`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers= {
                "Content-Type": "application/json",
                Authorization: `Bearer ${storedUser.state.token}`
        }
        const response = await fetchDataBackend(url, null, "GET", headers)
        setStudient(response)
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('es-EC', { dateStyle: 'long', timeZone: 'UTC' })
    }

    useEffect(() => {
        listStudient()
    }, [])


    return (
        <>
            <div>
                <h1 className='font-black text-4xl text-gray-500'>Visualizar</h1>
                <hr className='my-4 border-t-2 border-gray-300' />
                <p className='mb-8'>Este módulo te permite visualizar todos los datos</p>
            </div>
            <div>

                <div className='m-5 flex justify-between'>

                    <div>
                        <ul className="list-disc pl-5">

                            {/* Datos del paciente */}
                            <li className="text-md text-gray-00 mt-4 font-bold text-xl">Datos del Estudiante</li>

                            <ul className="pl-5">
                                <li className="text-md text-gray-00 mt-2">
                                    <span className="text-gray-600 font-bold">Nombres: {`${studient?.nombreEstudiante} ${studient?.apellidoEstudiante }`} </span>
                                </li>

                                <li className="text-md text-gray-00 mt-2">
                                    <span className="text-gray-600 font-bold"> Carrera: {studient?.carreraEstudiante}</span>
                                </li>

                                <li className="text-md text-gray-00 mt-2">
                                    <span className="text-gray-600 font-bold">correo: {studient?.emailEstudiante}</span>
                                </li>

                                <li className="text-md text-gray-00 mt-2">
                                <span className="text-gray-600 font-bold">Celular: {studient?.celularEstudiante}</span>
                                </li>

                                <li className="text-md text-gray-00 mt-2">
                                <span className="text-gray-600 font-bold">Periodo: {studient?.periodoEstudiante}</span>
                                </li>
                            </ul>

                        </ul>
                    
                    </div>

                    <div>
                        <img src={studient?.avatarCarrera || studient?.avatarCarreraID} alt="ball" className='h-80 w-80 rounded-full' />
                    </div>
                </div>

                <hr className='my-4 border-t-2 border-gray-300' />

                <div className='flex justify-between items-center'>

                    <p>Este módulo te permite gestionar los tratamientos</p>

                    <button className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700">
                        Registrar
                    </button>

                    {false && (<ModalTreatments />)}

                </div>

                {
                    Sport.length == 0
                        ?
                        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            <span className="font-medium">No existen registros</span>
                        </div>
                        :
                        <TableTreatments Sport={Sport} />
                }
            </div>
        </>

    )
}

export default Details