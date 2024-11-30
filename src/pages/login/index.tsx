import { Link } from "react-router";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";

export function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        setEmail("")
        setPassword("")

        console.log({
            email: email,
            senha: password,
        })
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">link
                <span className="bg-gradient-to-r from-indigo-700 to-violet-800 bg-clip-text text-transparent">Orbita</span></h1>
            </Link>

            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2">
                <Input 
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <Input 
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />  

                <button 
                className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
                type="submit"
                >Acessar</button>
            </form>
        </div>
    )
}