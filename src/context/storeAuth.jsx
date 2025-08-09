// es un gestor

import {create} from 'zustand';
import { persist } from 'zustand/middleware';


// voy a almacenar
const storeAuth=create(
    persist(
        set=>(
        {
            token:null,
            rol:null,
            // funcion que  permita actualizar 
            setToken:(token)=> set({token}),  // cuando inicia sesion guarda la informacion
            setRol:(rol)=>set({rol}),
            clearToken: () => set({ token: null})
            // cuando cierra sesion toda la informacion se queda vacia
        }),    

        {name:"auth-token"}

    )
)
// desde 9 hasta linea 18 que mantenga k la informacion ya sea que se recargue o se navegue entre paginas
// la linea 20  protege la ruta 


export default storeAuth