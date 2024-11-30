import { Link } from "react-router";
import { Input } from "../../components/input";

export function Login() {
    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">link
                <span className="bg-gradient-to-r from-indigo-700 to-violet-800 bg-clip-text text-transparent">Orbita</span></h1>
            </Link>

            <form className="w-full max-w-xl flex flex-col px-2">
                <Input/>

                <button 
                className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
                type="submit"
                >Acessar</button>
            </form>
        </div>
    )
}