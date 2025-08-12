import { useEffect, useState } from "react"
import TableTreatments from "../components/treatments/Table"
import ModalTreatments from "../components/treatments/Modal"
import { useParams } from "react-router"
import useFetch from "../hooks/useFetch"

const Details = () => {
  const { id } = useParams()
  const [student, setStudent] = useState(null)
  const [treatments, setTreatments] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const { fetchDataBackend } = useFetch()

  const listStudent = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/${id}`
    const storedUser = JSON.parse(localStorage.getItem("auth-token"))
    if (!storedUser?.state?.token) {
      // Manejar falta de token, p.ej redirect o alerta
      return
    }
    const headers= {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedUser.state.token}`
    }
    const response = await fetchDataBackend(url, null, "GET", headers)
    setStudent(response)

    // Si response tiene información de deportes, setear sports aquí (ejemplo):
    // setSports(response.deportes || [])
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-EC', { dateStyle: 'long', timeZone: 'UTC' })
  }

  useEffect(() => {
    listStudent()
  }, [id])

  if (!student) {
    return <p>Cargando datos...</p>
  }

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
              <li className="text-md text-gray-00 mt-4 font-bold text-xl">Datos del dueño</li>
              <ul className="pl-5">
                <li className="text-md text-gray-00 mt-2">
                  <span className="text-gray-600 font-bold">Nombre: {student.nombreEstudiante}</span>
                </li>
                <li className="text-md text-gray-00 mt-2">
                  <span className="text-gray-600 font-bold">Apellido: {student.apellidoEstudiante}</span>
                </li>
                <li className="text-md text-gray-00 mt-2">
                  <span className="text-gray-600 font-bold">Correo electrónico: {student.emailEstudiante}</span>
                </li>
                <li className="text-md text-gray-00 mt-2">
                  <span className="text-gray-600 font-bold">Periodo: {student.periodoEstudiante}</span>
                </li>
              </ul>
              <li className="text-md text-gray-00 mt-4 font-bold text-xl">Información de la Disciplina</li>
              <ul className="pl-5">
                <li className="text-md text-gray-00 mt-2">
                  <span className="text-gray-600 font-bold">Disciplina: {student.tipoDeporte}</span>
                </li>
                <li className="text-md text-gray-00 mt-2">
                  <span className="text-gray-600 font-bold">Horario: {student.horarioDeporte}</span>
                </li>
                <li className="text-md text-gray-00 mt-2">
                  <span className="text-gray-600 font-bold">Lugar: {student.lugarDeporte}</span>
                </li>
                <li className="text-md text-gray-00 mt-2">
                  <span className="text-gray-600 font-bold">Estado: </span>
                  <span className="bg-blue-100 text-green-500 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                    {student.estado === "activo" ? "Activo" : "Inactivo"}
                  </span>
                </li>
                <li className="text-md text-gray-00 mt-4">
                  <span className="text-gray-600 font-bold">Indica talla: {student.descripcionDeporte}</span>
                </li>
              </ul>
            </ul>
          </div>
          <div>
            <img src={student.avatarCarrera || student.avatarCarreraIA} alt="avatar" className='h-80 w-80 rounded-full' />
          </div>
        </div>
        <hr className='my-4 border-t-2 border-gray-300' />
        <div className='flex justify-between items-center'>
          <p>Este módulo te permite gestionar los tratamientos</p>
          <button 
            className="px-5 py-2 bg-green-800 text-white rounded-lg hover:bg-green-700" 
            onClick={() => setModalVisible(true)}
          >
            Registrar
          </button>
          {modalVisible && <ModalTreatments onClose={() => setModalVisible(false)} />}
        </div>
        {
          treatments.length === 0
          ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">No existen registros</span>
            </div>
          : <TableTreatments treatments={treatments} />
        }
      </div>
    </>
  )
}

export default Details
