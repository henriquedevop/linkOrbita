import { onAuthStateChanged, reauthenticateWithCredential } from "firebase/auth"
import { auth, fireStore } from "../../services/firebaseConnection"
import { Header } from "../../components/header"
import { FormEvent, useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { EmailAuthProvider } from "firebase/auth/web-extension"

export function Settings() {

    const [userId, setUserID] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [newUsername, setNewUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [usernameChanges, setUsernameChanges] = useState<number>(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [successfulMessage, setSucessfulMessage] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user) {
                setUserID(user.uid)

                const userRef = doc(fireStore, "users", user.uid)
                getDoc(userRef)
                .then((snapshot) => {
                    if(snapshot.exists()) {
                        setUsername(snapshot.data().username)
                        setNewUsername(snapshot.data().username)
                        setUsernameChanges(snapshot.data().usernameChanges || 0)
                    }
                })

            } else {
                setUserID(null)
                setUsername(null)
            }
        })

        return () => unsubscribe()

    },[])

    async function handleEditConfig(e:FormEvent) {
        e.preventDefault()

        if(newUsername === "" || password === "") {
            setErrorMessage("Preencha os campos")
            return
        }

        if(!userId) {
            return
        }

        try {
            const usersRef = collection(fireStore, "users")
            const q = query(usersRef, where("username", "==", newUsername))
            const querySnapshot = await getDocs(q)

            if(!querySnapshot.empty) {
                setErrorMessage("Esse username já esta sendo usado")
                return
            }
            if(usernameChanges >= 3) {
                setErrorMessage("Você atingiu o limite de alterações de nome de usuário.")
                return
            }

            const user = auth.currentUser
            if(user) {
                const credential = EmailAuthProvider.credential(user.email!, password)
                await reauthenticateWithCredential(user, credential)

                const userRef = doc(fireStore, "users", userId)
                await updateDoc(userRef, {
                    username: newUsername,
                    usernameChanges: usernameChanges + 1,
                })

                setSucessfulMessage("Nome de usuário atualizado com sucesso!")
                setErrorMessage("")

            }
        } catch(error) {
            console.error("Erro ao atualizar dados.", error)
            setErrorMessage("Senha incorreta")
        }

    }

    return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2 bg-gradient-to-r from-indigo-700 via-violet-800 to-indigo-700">
        <Header username={username} />

        <div className="bg-customGray p-8 rounded-lg shadow-lg w-full max-w-2xl mt-8">
            <h1 className="text-3xl text-white font-bold mb-6 text-center">Configurações da conta</h1>

            <span className="text-primary">{errorMessage}</span>
            <span className="text-lime-500">{successfulMessage}</span>

            <div className="space-y-8">
                <form onSubmit={handleEditConfig} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-white font-medium mb-2">
                            Nome de Usuário
                        </label>
                        <p className="text-zinc-400 text-sm mb-3">O nome que será exibido em sua conta.</p>
                        <input
                            type="text"
                            placeholder="Digite o novo nome de usuário"
                            className="w-full p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-white font-medium mb-2">
                            Email
                        </label>
                        <p className="text-zinc-400 text-sm mb-3">ADigite sua senha para confirmar a alteração.</p>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            className="w-full p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="text-zinc-400 text-sm">
                        <p>Você tem {3 - usernameChanges} mudanças restantes no nome de usuário.</p>
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