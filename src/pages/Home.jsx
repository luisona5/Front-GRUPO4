
import { Link } from 'react-router-dom';



export const Home = () => {
    return (
        <>
        
        


            <main className='text-center py-6 px-8 bg-blue-50  md:text-left md:flex justify-between items-center gap-10 md:py-1'>
                

                    <div className="flex justify-center gap-4">
                        <Link to="/login" href="#" className='block bg-blue-700 w-40 py-2 mx-auto text-white rounded-2xl text-center sm:mx-0 hover:bg-yellow-700'>Get started</Link>
                    </div>
                
            </main>


            <section className='container mx-auto px-4'>

                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>ABOUT US</h2>
                    <div className='text-amber-900 border-2 absolute top-1/2 w-full z-0' />
                </div>

                

            </section>


            
            
        </>
    )
}




