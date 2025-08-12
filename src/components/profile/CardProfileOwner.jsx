import storeProfile from "../../context/storeProfile"

export const CardProfileOwner = () => {

    const {user} = storeProfile()

    return (
        <div className="bg-white border border-slate-200 h-auto p-4 
                        flex flex-col items-center justify-between shadow-xl rounded-lg">

            <div>
                <img src="https://cdn-icons-png.flaticon.com/512/4715/4715329.png" alt="img-client" className="m-auto " width={120} height={120} />
            </div>
            <div className="self-start">
                <b>Nombre del estudiante:</b><p className="inline-block ml-3">{user.nombreEstudiante}</p>
            </div >
            <div className="self-start">
                <b>Apellido del estudiante:</b><p className="inline-block ml-3">{user.apellidoEstudiante}</p>
            </div >
            <div className="self-start">
                <b>Email del estudiante:</b><p className="inline-block ml-3">{user.emailEstudiante}</p>
            </div>
            <div className="self-start">
                <b>Celular del estudiante:</b><p className="inline-block ml-3">{user.celularEstudiante}</p>
            </div>
            <div className="self-start">
                <b>Carrera</b><p className="inline-block ml-3">{user.carreraEstudiante}</p>
            </div>
            <div className="self-start">
                <b>periodo:</b><p className="inline-block ml-3">{user.periodoEstudiante}</p>
            </div>
        </div>
    )
}