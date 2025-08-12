import { ToastContainer } from 'react-toastify';
import { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import exito from '../assets/reset.jpg'


// CREANDO EL FORMULARIO
const Reset = () => {
    const { fetchDataBackend } = useFetch()
    const { token } = useParams()
    const navigate = useNavigate();
    const [tokenback, setTokenBack] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();



    const changePassword = (data) => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/nuevopassword/${token}`
        fetchDataBackend(url, data,'POST')
        setTimeout(() => {
            navigate('/login')
        }, 3000)
    }

    useEffect(() => {
        const verifyToken = async()=>{
            const url = `${import.meta.env.VITE_BACKEND_URL}/recuperarpassword/${token}`
            fetchDataBackend(url, null,'GET')
            setTokenBack(true)
        }
        verifyToken()
    }, [])
    
    
return (
        <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat "

        style={{  backgroundImage: `linear-gradient(rgba(255, 251, 251, 0.21), rgba(246, 236, 236, 0.86)), url(${exito})` }}
        >
            <ToastContainer />  
            <h1 className="text-3xl font-semibold mb-2 text-center text-black">
                🏅¡Bienvenido/a!🏅
            </h1>
            <small className="text-gray-900 block my-4 text-sm">
                Recuerda! tu contraseña no la compartas
            </small>
            
            {tokenback && (
                <form className="w-80"  onSubmit={handleSubmit(changePassword)}>
                    <div className="mb-1">
                        <label className="mb-2 block text-sm font-semibold">
                            Nueva contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Ingresa tu nueva contraseña"
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            {...register("password",{required:"la contraseña es obligatoria"})}
                        />
                        {errors.password && <p className='text-red-800'>{errors.password.message}</p>}
                        <label className="mb-2 block text-sm font-semibold">
                            Confirmar contraseña
                        </label>
                        <input
                            type="password"
                            placeholder="Repite tu contraseña"
                            className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500"
                            {...register("confirmpassword",{required:"la contraseña es obligatoria"

                            })}/>
                            {errors.confirmpassword && <p className='text-red-800'>{errors.confirmpassword.message}</p>}

                    </div>
                    <div className="mb-3">
                        <button className="bg-gray-600 text-slate-300 border py-2 w-full rounded-xl mt-5 hover:scale-105 duration-300 hover:bg-gray-900 hover:text-white">
                            Enviar
                        </button>
                        <small className="text-gray-900 block my-4 text-sm">
                            <h6> Eres parte fundamental de nuestra comunidad.¡Juntos, vamos más allá! 💪</h6>
                        </small>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Reset;
