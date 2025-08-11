import { MdDeleteForever, MdInfo, MdPublishedWithChanges } from "react-icons/md";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router'


const Table = () => {

    const navigate = useNavigate()


    const { fetchDataBackend } = useFetch()
    const [studients, setStudients] = useState([])

    const listStudients = async () => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers= {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedUser.state.token}`,
        }
        const response = await fetchDataBackend(url, null, "GET", headers)
        setStudients( response)
    }

    useEffect(() => {
        listStudients()
    }, [])


    if (studients.length === 0) {
        return (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <span className="font-medium">No existen registros</span>
            </div>
        )
    }

    return (

        <table className="w-full mt-5 table-auto shadow-lg bg-white">
            <thead className="bg-gray-800 text-slate-400">
                <tr>
                    {["N°", "Nombre Estudiante", "Carrera", "Email", "Celular", "Estado", "Acciones"].map((header) => (
                        <th key={header} className="p-2">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    studients.map((studient, index) => (
                        <tr className="hover:bg-gray-300 text-center"
                            key={studient._id}>
                            <td>{index + 1}</td>
                            <td>{`${studient.nombreEstudiante} ${studient.apellidoEstudiante}`}</td>
                            <td>{studient.carreraEstudiante}</td>
                            <td>{studient.emailEstudiante}</td>
                            <td>{studient.celularEstudiante}</td>
                            <td>
                                <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">{studient && "activo"}</span>
                            </td>
                            <td className='py-2 text-center'>
                                <MdPublishedWithChanges
                                    title="Actualizar"
                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-blue-600"
                                />

                                <MdInfo
                                    title="Detalle"
                                    className="h-7 w-7 text-slate-800 cursor-pointer inline-block mr-2 hover:text-green-600"
                                    onClick={() => navigate(`/dashboard/visualizar/${studient._id}`)}
                                />

                                <MdDeleteForever
                                    title="Eliminar"
                                    className="h-7 w-7 text-red-900 cursor-pointer inline-block hover:text-red-600"
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Table
