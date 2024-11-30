import { Link, useNavigate } from "react-router";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";

import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleSubmit(e:FormEvent) {
        e.preventDefault()
        setEmail("")
        setPassword("")

        if(email === "" || password === "") {
            alert("Preencha todos os campos!")
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("LOGADO COM SUCESSO")
            navigate("/admin", {replace: true})
        })
        .catch((error) => {
            console.log("ERROR AO LOGAR USUARIO:")
            console.log(error)
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