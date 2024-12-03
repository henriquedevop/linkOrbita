import { Link } from "react-router";

export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-indigo-700 via-violet-800 to-indigo-700 text-white text-center">
            <h2 className="text-7xl font-extrabold">404</h2>
            <h3 className="text-2xl md:text-3xl mt-4">Página não encontrada</h3>
            <p className="mt-2 text-lg text-gray-300">
                Parece que você se perdeu. A página que você está procurando não existe.
            </p>
            <Link
                to="/"
                className="mt-8 px-6 py-3 text-lg font-medium text-indigo-700 bg-white rounded-md shadow-lg hover:scale-105 hover:shadow-2xl"
            >
                Voltar para a Home
            </Link>
        </div>
    );
}
