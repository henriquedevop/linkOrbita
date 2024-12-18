import { Link, useNavigate } from "react-router"
import { Input } from "../../components/input"
import { Loading } from "../../components/loading"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { setDoc, doc, collection, where,query, getDocs } from "firebase/firestore"
import { auth, fireStore } from "../../services/firebaseConnection"
import { FormEvent, useState } from "react"

export function SignUp() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    async function handleRegister(e:FormEvent) {
        e.preventDefault()
        setLoading(true)
        if(username === "" || email === "" || password === "" || confirmPassword === "") {
            setErrorMessage("Preencha todos os campos")
            setLoading(false)
            return
        }

        try {
            const querySnapshot = await getDocs(
                query(collection(fireStore, "users"), where("username", "==", username))
            );

            if(!querySnapshot.empty) {
                setErrorMessage("Este username já está em uso. Tente outro")
                setLoading(false)
                return
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;

            await setDoc(doc(fireStore, "users", user.uid), {
                username: username,
                email: user.email,
                created: new Date(),
            })
            
            console.log("Usuario criado com sucesso")
            navigate("/login", {replace: true})
        } catch (error: any) {
            console.log("Erro ao criar conta", error);
            let message = "Erro ao criar usuário";
            switch (error.code) {
                case "auth/email-already-in-use":
                    message = "Este email já está em uso.";
                    break;
                case "auth/weak-password":
                    message = "A senha deve ter pelo menos 6 caracteres.";
                    break;
                case "auth/invalid-email":
                    message = "O email fornecido é inválido.";
                    break;
                case "auth/operation-not-allowed":
                    message = "Método de criação de conta não permitido.";
                    break;
                default:
                    message = "Erro desconhecido ao criar conta.";
            }
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex w-full h-screen items-center justify-center bg-gradient-to-r from-indigo-700 via-violet-800 to-indigo-700">
            {loading ? <Loading/> : ""}
            <div className="bg-customGray p-10 rounded-lg shadow-lg w-full max-w-md">
                <Link
                to="/"
                className="flex justify-center"
                >
                <h1 
                className="text-white font-bold mb-2 text-5xl">
                link
                <span
                className="bg-gradient-to-r from-indigo-400 to-violet-600 bg-clip-text text-transparent" 
                >Órbita</span>
                </h1>
                </Link>

                {errorMessage && (
                    <span className="text-primary">{errorMessage}</span>
                )}

            <form onSubmit={handleRegister} className="flex flex-col mt-5 gap-5">
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

                <Input
                type="password"
                placeholder="Confirme sua senha"
                onChange={(e) => {
                    const value = e.target.value
                    setConfirmPassword(e.target.value)
                    if(value != password) {
                        setErrorMessage("As senhas não coincidem.")
                    } else {
                        setErrorMessage("")
                    }
                }}
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