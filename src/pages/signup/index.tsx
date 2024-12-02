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
        <div className="flex w-full h-screen items-center justify-center bg-gradient-to-r from-indigo-700 via-violet-800 to-indigo-700">

            <div className="bg-customGray p-10 rounded-lg shadow-lg w-full max-w-md">
                <Link
                to="/"
                className="flex justify-center"
                >
                <h1 
                className="text-white font-bold text-5xl mb-7">
                link
                <span
                className="bg-gradient-to-r from-indigo-400 to-violet-600 bg-clip-text text-transparent" 
                >Órbita</span>
                </h1>
                </Link>

            <form onSubmit={handleRegister} className="flex flex-col gap-5">
                <Input
                type="text"
                placeholder="Qual seu nome ou apelido?"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <Input
                type="email"
                placeholder="Digite seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <Input
                type="password"
                placeholder="Criei uma senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                />

                <button
                className="h-12 bg-violet-600 hover:bg-violet-700 transition rounded-lg text-lg font-medium text-white"
                type="submit"
                disabled={loading}
                >{loading ? "Criando sua conta..." : "Criar conta"}</button>

            </form>
            <div className="mt-5 text-center">
                <p className="text-zinc-400">
                    Já tem uma conta?{" "}
                    <Link
                        to="/login"
                        className="text-violet-400 hover:text-violet-500 font-medium"
                    >
                        Entre aqui
                    </Link>
                </p>
            </div>
            </div>
        </div>
    )
}