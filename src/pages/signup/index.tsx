import { Link, useNavigate } from "react-router"
import { Input } from "../../components/input"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc } from "firebase/firestore"
import { auth, fireStore } from "../../services/firebaseConnection"
import { FormEvent, useState } from "react"

export function SignUp() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleRegister(e:FormEvent) {
        e.preventDefault()
        setLoading(true)
        if(username === "" || email === "" || password === "") {
            alert("preencha todos os campos")
            setLoading(false)
            return
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user

            await setDoc(doc(fireStore, "users", user.uid), {
               username: username,
               email: user.email,
               created: new Date(),
            })

            console.log("Usuario criado com sucesso")
            navigate("/login", {replace: true})
        })
        .catch((error) => {
            let errorMessage = "Erro ao criar usuário";
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "Este e-mail já está em uso.";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "A senha precisa ter pelo menos 6 caracteres.";
            }
            console.error("Error ao criar usuario", error);
            alert(errorMessage);
        })
        .finally(() => {
            setLoading(false)
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
                disabled={loading}
                >{loading ? "Criando sua conta..." : "Criar conta"}</button>

            </form>
            <Link className="text-white" to="/login">Ja tem conta? entre aqui</Link>
        </main>
    )
}