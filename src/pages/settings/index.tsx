import { onAuthStateChanged } from "firebase/auth"
import { auth, fireStore } from "../../services/firebaseConnection"
import { Header } from "../../components/header"
import { useEffect, useState } from "react"
import { doc, getDoc } from "firebase/firestore"

export function Settings() {

    const [userId, setUserID] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUserID(user.uid)

                const userRef = doc(fireStore, "users", user.uid)
                getDoc(userRef)
                .then((snapshot) => {
                    if(snapshot.exists()) {
                        setUsername(snapshot.data().username)
                    }
                })

            } else {
                setUserID(null)
                setUsername(null)
            }
        })

        return () => unsubscribe()

    },[])

    return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2 bg-gradient-to-r from-indigo-700 via-violet-800 to-indigo-700">
        <Header username={username} />

        <div className="bg-customGray p-8 rounded-lg shadow-lg w-full max-w-2xl mt-8">
            <h1 className="text-3xl text-white font-bold mb-6 text-center">Configurações da conta</h1>

            <div className="space-y-8">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-white font-medium mb-2">
                            Nome de Usuário
                        </label>
                        <p className="text-zinc-400 text-sm mb-3">O nome que será exibido em sua conta.</p>
                        <input
                            type="text"
                            placeholder="Digite o novo nome de usuário"
                            className="w-full p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white font-medium mb-2">
                            Email
                        </label>
                        <p className="text-zinc-400 text-sm mb-3">Altere o email associado à sua conta.</p>
                        <input
                            type="email"
                            placeholder="Digite o novo email"
                            className="w-full p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-12 bg-violet-600 hover:bg-violet-700 transition rounded-lg text-lg font-medium text-white"
                    >
                        Salvar Alterações
                    </button>
                </form>
            </div>
        </div>
    </div>
    )
}