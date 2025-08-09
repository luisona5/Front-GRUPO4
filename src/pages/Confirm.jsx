import {  useEffect } from 'react'
import confirmacion from '../assets/confirma.jpg'
import fondo from '../assets/fondoDeporte.jpg'
import {Link, useParams} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'


export const Confirm = () => {

    // CAPTUARAR EL TOKEN
    const {token}=useParams() //capturo del token

    const verifyToken=  async()=>{
         try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/confirmar/${token}`
            
            const respuesta = await axios.get(url);
            toast.success(respuesta?.data?.msg) // ? significa encadenamiento opcional


        } catch (error) {
            toast.error(error?.response?.data?.msg)
        }
    }


    useEffect(() => {
         verifyToken()
     
    },[])

    return (
        <div 
            className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat "
           
             style={{  backgroundImage: `linear-gradient(rgba(255, 251, 251, 0.21), rgba(246, 236, 236, 0.86)), url(${fondo})` }}
        >
            <ToastContainer />

            <img className="object-cover h-80 w-80 rounded-full border-4 border-solid border-slate-600" src={confirmacion} alt="image description"/>

            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">Muchas Gracias</p>
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">Ya puedes iniciar sesión</p>
                <Link to="/login" className="p-3 m-5 w-full text-center bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white">Login</Link>
            </div>
        </div>
    )
}
 