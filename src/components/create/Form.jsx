import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import {generateAvatar,convertBlobToBase64} from "../../helpers/consultarIA"
import { toast, ToastContainer } from "react-toastify"
import { useEffect } from "react";


export const Form = (studient) => {

    const [avatar, setAvatar] = useState({
        image: "https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:1280/p:16x9/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.jpg",
        prompt: "",
        loading: false
    })

    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm()
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
            setValue("avatarCarreraIA", base64Image)
        }
        else {
            toast.error("Error al generar la imagen, vuelve a intentarlo dentro de 1 minuto");
            setAvatar(prev => ({ ...prev, image: "https://s.france24.com/media/display/6aca8d1a-7783-11ea-9cf2-005056bf87d6/w:1280/p:16x9/WEB%2005ABR%20DEPORTES%20PORTADA%20FOTO.jpg",
                 loading: false }))
            setValue("avatarCarreraIA", avatar.image)
        }
    }


   const registerStudient = async (data) => {
    const imageOption = data.imageOption;
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
        // Excluir claves de imagen para manejarlas por separado
        if (key !== "imagen" && key !== "avatarCarreraIA" && key !== "imageOption") {
            formData.append(key, data[key]);
        }
    });

    if (imageOption === "upload" && data.imagen && data.imagen[0]) {
        // Opción: Subir Imagen
        formData.append("imagen", data.imagen[0]);
    } else if (imageOption === "ia" && data.avatarCarreraIA) {
        // Opción: Generar con IA
        try {
            // Convertir Base64 a Blob y luego a File para el backend
            const base64String = data.avatarCarreraIA.split(',')[1];
            const binaryString = atob(base64String);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'image/jpeg' });
            const file = new File([blob], "imagen_ia.jpeg", { type: "image/jpeg" });

            formData.append("imagen", file);
        } catch (error) {
            console.error("Error al convertir Base64 a File:", error);
            toast.error("Error al procesar la imagen generada por IA.");
            return;
        }
    } else {
        toast.error("Por favor, selecciona o genera una imagen.");
        return;
    }

    let url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/registro`;
    const storedUser = JSON.parse(localStorage.getItem("auth-token"));
    const headers = {
        Authorization: `Bearer ${storedUser.state.token}`
    };

    let response
        if (studient?._id) {
            url = `${import.meta.env.VITE_BACKEND_URL}/estudiante/actualizar/${studient._id}`
            response = await fetchDataBackend(url, formData, "PUT", headers)
        }
        else{
            response = await fetchDataBackend(url, formData, "POST", headers)
        }
        
        if (response) {
             setTimeout(() => {
            navigate("/dashboard/listar");
                }, 2000);
        }
};

useEffect(() => {
        if (studient) {
            reset({
                apellidoEstudiante: studient?.apellidoEstudiante,
                nombreEstudiante: studient?.nombreEstudiante,
                emailEstudiante: studient?.emailEstudiante,
                celularEstudiante: studient?.celularEstudiante,
                carreraEstudiante: studient?.carreraEstudiante,
                horarioDeporte: studient?.horarioDeporte,
                descripcionDeporte: studient?.descripcionDeporte,
                periodoEstudiante:studient?.periodoEstudiante,
                tipoDeporte: studient?.tipoDeporte,
                lugarDeporte: studient?.lugarDeporte
            })
        }
    }, [])


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
                        <button className="py-1 px-8 bg-gray-600 text-slate-300 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-900 hover:text-white sm:w-80"
                        disabled={studient}
                        >
                            Consultar
                        </button>
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
                <div>
                    <label className="mb-2 block text-sm font-semibold">Periodo Matriculado </label>
                    <select
                        id='periodo'
                        className='block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5'
                        {...register("periodoEstudiante", { required: "Campo es obligatorio" })}
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="24-A">24-A</option>
                        <option value="24-B">24-B</option>
                        <option value="25-A">25-A</option>
                        <option value="25-B">25-B-</option>
                    </select>
                    {errors.periodoEstudiante && <p className="text-red-800">{errors.periodoEstudiante.message}</p>}
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
                            {...register("imageOption", { required: !studient && "El nombre de la mascota es obligatorio"})}
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

                {/* Lugar de entrenamiento */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Lugar de entrenamiento</label>
                    <select
                        id='lugar'
                        className='block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5'
                        {...register("lugar", { required: "Sleccione el lugar de entrenamiento" })}
                    >
                        <option value="">--- Seleccionar ---</option>
                        <option value="Bombonera">Bombonera-Edificio 21</option>
                        <option value="Estadio Politecnico">Estadio Politecnico</option>
                        <option value="Canchas">Canchas</option>
                    </select>
                    {errors.lugar && <p className="text-red-800">{errors.lugar.message}</p>}
                </div>

                {/* Horario de entrenamiento */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Horario de entrenamiento</label>
                    <input
                        type="text"
                        placeholder="indique horario de disposicion"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("horario", { required: "disponiblilidad para entrenar Obligatorio" })}
                    />
                    {errors.horario && <p className="text-red-800">{errors.horario.message}</p>}
                </div>

                {/* Síntomas */}
                <div>
                    <label className="mb-2 block text-sm font-semibold">Descripcion</label>
                    <textarea
                        placeholder="indique la talla de uniforme"
                        className="block w-full rounded-md border border-gray-300 py-1 px-2 text-gray-500 mb-5"
                        {...register("descripcion", { required: "campo es obligatorio" })}
                    />
                    {errors.descripcion && <p className="text-red-800">{errors.descripcion.message}</p>}
                </div>
            </fieldset>

            {/* Botón de submit */}
            <input
                type="submit"
                className="bg-gray-800 w-full p-2 mt-5 text-slate-300 uppercase font-bold rounded-lg 
                hover:bg-gray-600 cursor-pointer transition-all"
                value={studient ? "Registrar" : "Registrar"}
            />
        </form>

    )
}
