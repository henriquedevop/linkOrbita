import { Link } from "react-router";

export function Login() {
    return (
        <div className="flex w-full h-screen items-center justify-center">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">link
                <span className="bg-gradient-to-r from-indigo-700 to-violet-800 bg-clip-text text-transparent">Orbita</span></h1>
            </Link>
        </div>
    )
}