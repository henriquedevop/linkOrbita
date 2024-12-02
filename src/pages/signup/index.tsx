import { Link, useNavigate } from "react-router"
import { Input } from "../../components/input"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../services/firebaseConnection"
import { FormEvent, useState } from "react"

export function SignUp() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleRegister(e:FormEvent) {
        e.preventDefault()
        if(username === "" || email === "" || password === "") {
            alert("preencha todos os campos")
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            setUsername("")
            setEmail("")
            setPassword("")    
            console.log("Usuario criado com sucesso")
            navigate("/login", {replace: true})
        })
        .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
            alert("Esse email já está em uso.");
            } else if (error.code === "auth/weak-password") {
            alert("A senha deve ter pelo menos 6 caracteres.");
            } else {
            alert("Erro ao criar usuário. Tente novamente.");
            }
        })
    }

    return (
        <main className="flex w-full h-screen items-center justify-center flex-col">
            <Link to="/">
                <h1 className="mt-11 text-white mb-7 font-bold text-5xl">link
                <span className="bg-gradient-to-r from-indigo-700 to-violet-800 bg-clip-text text-transparent">Orbita</span></h1>
            </Link>

            <form onSubmit={handleRegister} className="w-full max-w-xl flex flex-col px-2">

                <Input
                type="text"
                placeholder="Qual seu nome ou apelido?"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                type="email"
                placeholder="Digite seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                type="password"
                placeholder="Criei uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

                <button
                className="h-9 bg-blue-600 rounded border-0 text-lg font-medium text-white"
                type="submit"
                >Criar conta</button>

            </form>
        </main>
    )
}