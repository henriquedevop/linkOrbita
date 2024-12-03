import { Link, useNavigate } from "react-router";
import { Input } from "../../components/input";
import { FormEvent, useEffect, useState } from "react";

import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const navigate = useNavigate()

    function handleSubmit(e:FormEvent) {
        e.preventDefault()

        if(email === "" || password === "") {
            setErrorMessage("Preencha todos os campos!")
            return
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            console.log("LOGADO COM SUCESSO")
            navigate("/admin", {replace: true})
        })
        .catch((error) => {
            console.log("ERROR AO LOGAR USUARIO:")
            console.log(error.code)

            let message = "Erro ao tentar logar";
            switch (error.code) {
                case "auth/invalid-email":
                    message = "O email fornecido é inválido.";
                    break;
                case "auth/user-not-found":
                    message = "Usuário não encontrado.";
                    break;
                case "auth/invalid-credential":
                    message = "Email ou senha incorretos.";
                    break;
                case "auth/too-many-requests":
                    message = "Muitas tentativas. Tente novamente mais tarde.";
                    break;
                case "auth/operation-not-allowed":
                    message = "Método de autenticação não permitido.";
                    break;
                default:
                    message = "Erro desconhecido."
            }
            setErrorMessage(message)
        })

        setEmail("")
        setPassword("")

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                navigate("/admin", {replace: true})
            }
        })

        return () => unsubscribe()

    },[navigate])

    return (
        <div className="flex w-full h-screen items-center justify-center bg-gradient-to-r from-indigo-700 via-violet-800 to-indigo-700">

            <div className="bg-customGray p-10 rounded-lg shadow-lg w-full max-w-md">
                <Link
                to="/"
                className="flex justify-center"
                >
                <h1 
                className="text-white font-bold text-5xl">
                link
                <span
                className="bg-gradient-to-r from-indigo-400 to-violet-600 bg-clip-text text-transparent" 
                >Órbita</span>
                </h1>
                </Link>

                {errorMessage && (
                    <span className="text-primary">{errorMessage}</span>
                )}

                <form onSubmit={handleSubmit} className="flex mt-7 flex-col gap-5">
                    <Input 
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />

                    <Input 
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />  

                    <button 
                    className="h-12 bg-violet-600 hover:bg-violet-700 transition rounded-lg font-medium text-white"
                    type="submit"
                    >
                    Acessar
                    </button>

                </form>

                <div className="mt-5 text-center">
                    <p className="text-zinc-400">
                        Não tem conta?{" "}
                        <Link
                        to="/signup"
                        className="text-violet-400 hover:text-violet-500 font-medium"
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    )
}