import { Link } from 'react-router';
import error from '/public/images/error1.jpg'

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img
                className="object-cover h-100 w-100 rounded-full border-4 border-solid border-slate-300"
                src={error}
                alt="image description"
            />

            <div className="flex flex-col items-center justify-center text-center mt-12">
                <p className="text-2xl md:text-2xl lg:text-5xl text-gray-800 text-center"> Parece que te perdiste en el ciberespacio. </p>
                <p className="md:text-lg lg:text-xl text-gray-600 mt-8">¡Pero no te preocupes, te ayudaremos a volver.</p>
                <Link to="/" className="p-3 m-5 w-full text-center bg-blue-300 text-black-500 border rounded-xl hover:scale-110 duration-300 hover:bg-gray-600 hover:text-white">
                    Regresar
                </Link>
            </div>
        </div>
    );
};
