{/*import logoDarkMode from '../assets/dark.png'*/}
{/*import logoDogCatMain from '../assets/dogmain.png'*/}
import cancha from '../assets/futbol1.jpg'
{/*import logoDog from '../assets/dog-hand.webp'*/}
import { Link } from 'react-router-dom';

import { FaFacebook } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import dragon_cabeza from '../assets/cabeza dragon negro.png'
import atletismo from '../assets/atletismo.jpg'
import esfot from '../assets/esfot.png'
import { FaTiktok } from 'react-icons/fa6';

export const Home = () => {
    return (
        <>
        
        <header className="container mx-auto h-40 text-center py-4 md:flex justify-between items-center px-4 md:h-15">
            <ul className='flex justify-center items-center gap-6 my-4'>
                {/*esfot para el logo pequeño */ }
                <li><img src={dragon_cabeza} alt="logo" width='80px' height='80px' />
                </li>
                </ul>
                
                <h1 className='font-bold text-3xl my-6 text-black-700 ' style={{ fontFamily: 'Colobri' }}>
                    <i>UNETE AL EVENTO MAS EMOCIONANTE</i></h1>
                <ul className='flex justify-center items-center gap-6 my-4'> 
                    <li><img src={esfot} alt="logo" width='80px' height='80px' />
                    </li>
                </ul>
                
            </header>



            <main className='text-center py-6 px-8 bg-blue-50  md:text-left md:flex justify-between items-center gap-10 md:py-1'>
                <div className=''>
                    <h1 className='font-lato font-extrabold text-black uppercase text-4xl my-4 md:text-6xl'></h1>

                    <div className="relative z-10 text-center px-6" style={{ fontFamily: 'Colibri' }} >
                        <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-lg">
                            Cuando el cuerpo se mueve<br /> el alma también sana.</h1>
                        
                        <p className="mt-2 text-lg md:text-2xl opacity-90">
                        Vive el deporte como forma de libertad, emoción y vida.
                        </p>
                    </div>

                    <div className="flex justify-center gap-4">
                        <Link to="/login" href="#" className='block bg-blue-700 w-40 py-2 mx-auto text-white rounded-2xl text-center sm:mx-0 hover:bg-yellow-700'>Get started</Link>
                    </div>
                </div>
                <div className='hidden md:block'>
                    <img src={cancha} alt="deporte" width='800px' height='1000px' />
                </div>
            </main>


            <section className='container mx-auto px-4'>

                <div className='container mx-auto relative mt-6'>
                    <h2 className='font-semibold text-3xl relative z-1 w-50 text-center mx-auto bg-white'>ABOUT US</h2>
                    <div className='text-amber-900 border-2 absolute top-1/2 w-full z-0' />
                </div>

                <div className='my-10 flex flex-col gap-10 items-center sm:flex-row sm:justify-around sm:items-center'>

                    <div className='sm:w-1/2'>
                        <img src={atletismo} alt="App Store" className='w-full h-full object-cover' />
                    </div>

                    <div className='px-1 sm:w-1/2 w-72 break-words'>

                        <p className='my-4'>
                            La ESFOT, fiel a su misión de formar tecnólogos de excelencia y emprendedores, 
                            y a su visión de liderazgo, innovación y compromiso con el desarrollo sustentable , 
                            encuentra en el deporte una gran fuente de inspiración y crecimiento integral.
                            A través de actividades deportivas institucionales y eventos como el “Campeonato Interfacultades EPN”, 
                            el deporte no solo fortalece la salud física, sino que despierta el espíritu competitivo, 
                            la disciplina y el sentido de comunidad entre sus estudiantes. 
                            Este entorno deportivo convierte cada cancha en una extensión de los laboratorios: sacando lo mejor de cada uno, 
                            estimulando la creatividad, el trabajo en equipo y el compromiso,
                            cualidades esenciales en los profesionales que la ESFOT busca formar. 
                            En este contexto, la ESFOT no solo apuesta por la tecnología de punta, 
                            sino por el desarrollo de personas resilientes, enérgicas y líderes, 
                            capaces de transformar la sociedad, tanto en su campo profesional como en su vida personal.
                        </p>
                        
                    </div>

                </div>

            </section>


            <footer className='text-center bg-blue-50 p-4 sm:px-10 sm:py-10  rounded-tr-4xl rounded-tl-4xl '>

                <div className='flex justify-between items-center flex-col sm:flex-row'>
                    <div className='text-3xl font-extrabold '>contactanos</div>
                    <ul className='flex-col gap-2 text-fullbold' >
                        <p><i>Siguenos en todas nuestras redes sociales</i></p>
                        <li><FaFacebook className='text-2xl' /></li>
                        <li><FaSquareInstagram className='text-2xl' /></li>
                        <li><FaXTwitter className='text-2xl' /></li>
                        <FaTiktok className='text-2xl' />
                    </ul>
                </div>
                <div className='flex justify-between items-center'>
                    <ul className='flex-col gap-2 font-bold' >
                        <p><i>Terminos y condiciones</i></p>
                        <p><i>Trabaja con nosotros</i></p>
                    </ul>


                </div>

                <div className='flex justify-between items-center'>
                    <div className='text-left' >
                        <i>
                        <p className='font '>alisson.viracocha@epn.edu.ec / 0999846455</p>
                        <p className='font '>jorge.onaguanoquiza@epn.edu.ec / 0995590863</p>
                        </i>
                    </div>

                </div>

                <hr className='border-1 border-blue-80' />

                <p className='font' >
                    <i>
                    Todos los derechos reservados 2025 - © 
                    <br />GROUP 4 
                    </i>
                </p>
            </footer>

            
        </>
    )
}




