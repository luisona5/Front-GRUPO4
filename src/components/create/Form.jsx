import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import {generateAvatar,convertBlobToBase64} from "../../helpers/consultarIA"
import { toast, ToastContainer } from "react-toastify"


export const Form = () => {

    const [avatar, setAvatar] = useState({
        image: "https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:1280/p:16x9/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.jpg",
        prompt: "",
        loading: false
    })

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm()
    const { fetchDataBackend } = useFetch()


    const selectedOption = watch("imageOption")


    const handleGenerateImage = async () => {
        setAvatar(prev => ({ ...prev, loading: true }))
        const blob = await generateAvatar(avatar.prompt)
        if (blob.type === "image/jpeg") {
            // blob:http://localhost/ea27cc7d-
            const imageUrl = URL.createObjectURL(blob)
            // data:image/png;base64,iVBORw0KGg
            const base64Image = await convertBlobToBase64(blob)           
            setAvatar(prev => ({ ...prev, image: imageUrl, loading: false }))
            setValue("avatarMascotaIA", base64Image)
        }
        else {
            toast.error("Error al generar la imagen, vuelve a intentarlo dentro de 1 minuto");
            setAvatar(prev => ({ ...prev, image: "https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:1280/p:16x9/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.jpg",
                 loading: false }))
            setValue("avatarMascotaIA", avatar.image)
        }
    }



    const registerStudient = async (data) => {
        /*
        const data = {
            nombre: "Firulais",
            edad: "2",
            imagen: [File]  // un array con 1 imagen cargada por el usuario
        }
        */
        // clase de JavaScript ideal para enviar datos como texto + imágenes al servidor
        const formData = new FormData()
        // Recorre todos los elementos del formulario
        Object.keys(data).forEach((key) => {
            if (key === "imagen") {
                formData.append("imagen", data.imagen[0]) // se guarda el archivo real
            } else {
                formData.append(key, data[key]) // se guardan nombre y edad
            }
        })
        const url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/registro`
        const storedUser = JSON.parse(localStorage.getItem("auth-token"))
        const headers= {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${storedUser.state.token}`
            }
        
        const response = await fetchDataBackend(url, formData, "POST", headers)
        if (response) {
            setTimeout(() => {
                navigate("/dashboard/listar")
            }, 2000);
        }
    }
    return (
        <form onSubmit={handleSubmit(registerStudient)}>
            <ToastContainer />

            {/* Información del propietario */}
            <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg">
                <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                    Ingreso de estudiante
                </legend>

                {/* Nombre del estudiante*/}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Nombre</label>
                    <div className="flex items-center gap-10 mb-5">
                        <input
                            type="text"
                            placeholder="Ingrese nombre del estudiante"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                            {...register("nombreEstudiante", { required: " Se requiere nombre del estudiante" })}
                        />
                        
                    </div>
                    {errors.nombreEstudiante && <p className="text-red-800">{errors.nombreEstudiante.message}</p>}
                </div>

                {/* Apellido del estudiante */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Apellido</label>
                    <input
                        type="text"
                        placeholder="Ingrese apellido del estudiante"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("apellidoEstudiante", { required: "Se requiere Apellido del estudiante" })}
                    />
                    {errors.apellidoEstudiante && <p className="text-red-800">{errors.apellidoEstudiante.message}</p>}
                </div>

                {/* Correo electrónico */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Correo electrónico</label>
                    <input
                        type="email"
                        placeholder="Ingrese correo electrónico institucional"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("emailEstudiante", { required: "El correo electrónico es obligatorio" })}
                    />
                    {errors.emailEstudiante && <p className="text-red-800">{errors.emailEstudiante.message}</p>}
                </div>

                {/* Celular */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Celular</label>
                    <input
                        type="number"
                        placeholder="Ingrese telefono o celular"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("celularEstudiante", { required: "El celular es obligatorio" })}
                    />
                    {errors.celularEstudiante && <p className="text-red-800">{errors.celularEstudiante.message}</p>}
                </div>

                {/* carrera del estudiante */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Carrera</label>
                    <select
                        id='carrera'
                        className='block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5'
                        {...register("carreraEstudiante", { required: "Seleccione una Carrera" })}
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="Electromecanica">Electromecanica</option>
                        <option value="Agua y Saneamiento Ambiental">Agua y Saneamiento Ambiental</option>
                        <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                        <option value="Desarrollo de Software">Desarrollo de Software</option>
                    </select>
                    {errors.carreraEstudiante && <p className="text-red-800">{errors.carreraEstudiante.message}</p>}
                </div>



            </fieldset>




            {/*--------------------------------------------------------------------------------------------------------------*/ }

            {/* Información del deporte */}
            <fieldset className="border-2 border-gray-500 p-6 rounded-lg shadow-lg mt-10">
                <legend className="text-xl font-bold text-gray-700 bg-gray-200 px-4 py-1 rounded-md">
                    Información del Deporte
                </legend>

                {/* Deporte*/}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Disciplina</label>
                    <select
                        id='Disciplina'
                        className='block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5'
                        {...register("nombre", { required: "Seleccione disciplina" })}
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="Futbolball">Futbolball</option>
                        <option value="Basquetball">Basquetball</option>
                        <option value="Voleyball">Voleyball</option>
                        
                    </select>
                    {errors.nombre && <p className="text-red-800">{errors.nombre.message}</p>}
                </div>

                {/* Imagen de la disciplina*/}
                <label className="mb-2 block text-sm font-semibold">Imagen de la Disciplina</label>
                <div className="flex gap-4 mb-2">
                    {/* Opción: Imagen con IA */}
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="ia"
                            {...register("imageOption", { required: "Seleccione una opción" })}
                        />
                        Generar con IA
                    </label>

                    {/* Opción: Subir Imagen */}
                    <label className="flex items-center gap-2">
                        <input
                            type="radio"
                            value="upload"
                            {...register("imageOption", { required: "Seleccione una opción" })}
                        />
                        Subir Imagen
                    </label>
                </div>
                {errors.imageOption && <p className="text-red-800">{errors.imageOption.message}</p>}

                {/* Imagen con IA */}
                {selectedOption === "ia" && (
                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold">Imagen con IA</label>
                        <div className="flex items-center gap-10 mb-5">
                            <input
                                type="text"
                                placeholder="Ingresa el prompt"
                                className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500"
                                value={avatar.prompt}
                                onChange={(e) => setAvatar(prev => ({ ...prev, prompt: e.target.value }))}
                            />
                            <button
                                type="button"
                                className="py-1 px-8 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white sm:w-80"
                                onClick={handleGenerateImage}
                                disabled={avatar.loading}
                            >
                                {avatar.loading ? "Generando..." : "Generar con IA"}
                            </button>
                        </div>
                        {avatar.image && (
                            <img src={avatar.image} alt="Avatar IA" width={100} height={100} />
                        )}
                    </div>
                )}

                {/* Subir Imagen */}
                {selectedOption === "upload" && (
                    <div className="mt-5">
                        <label className="mb-2 block text-sm font-semibold">Subir Imagen</label>
                        <input
                            type="file"
                            className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                            {...register("imagen")}
                        />
                    </div>
                )}

                {/* Tipo de mascota */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Tipo</label>
                    <select
                        id='prioridad'
                        className='block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5'
                        {...register("tipoMascota", { required: "El tipo de la mascota es obligatorio" })}
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="gato">Gato</option>
                        <option value="perro">Perro</option>
                        <option value="otro">Otro</option>
                    </select>
                    {errors.tipoMascota && <p className="text-red-800">{errors.tipoMascota.message}</p>}
                </div>

                {/* Fecha de nacimiento */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Fecha de nacimiento</label>
                    <input
                        type="date"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("fechaNacimientoMascota", { required: "La fecha de nacimiento de la mascota es obligatorio" })}
                    />
                    {errors.fechaNacimientoMascota && <p className="text-red-800">{errors.fechaNacimientoMascota.message}</p>}
                </div>

                {/* Síntomas */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Síntomas</label>
                    <textarea
                        placeholder="Ingresa los síntomas"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("sintomasMascota", { required: "El síntoma de la mascota es obligatorio" })}
                    />
                    {errors.sintomasMascota && <p className="text-red-800">{errors.sintomasMascota.message}</p>}
                </div>
            </fieldset>

            {/* Botón de submit */}
            <input
                type="submit"
                className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg 
                hover:bg-gray-600 cursor-pointer transition-all"
                value="Registrar"
            />
        </form>

    )
}