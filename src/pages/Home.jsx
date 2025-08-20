//import portada from 'images/inicioDeporte.jpg'
import { Link } from 'react-router-dom';



export const Home = () => {
    return (
        <>
            <div className='bg-url[./images/inicioDeporte.jpg] bg-fixed'></div>
        


            <main className='text-center py-6 px-8 bg-blue-50  md:text-left md:flex justify-between items-center gap-10 md:py-1'>
                

                    <div className="flex justify-center gap-4">
                        <Link to="/login" href="#" className='block bg-blue-700 w-40 py-2 mx-auto text-white rounded-2xl text-center sm:mx-0 hover:bg-yellow-700'>Get started</Link>
                    </div>
                
            </main>


            


            
            
        </>
    )
}




