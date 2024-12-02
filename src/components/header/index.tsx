import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router"

import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"

interface HeaderProps {
    username: string | null;
}

export function Header({ username }: HeaderProps) {

    async function handleLogout() {
        try {
            await signOut(auth)
            console.log("User deslogado com sucesso!")
        } catch(error) {
            console.log("error ao deslogar", error)
        }
    }

    return (
        <header className="w-full max-w-2xl mt-6 px-2 text-white">
            <nav className="w-full bg-black/25 backdrop-blur-lg h-14 flex items-center justify-between rounded-lg shadow-lg px-6 border border-white/20">
                <div className="flex gap-4 font-semibold">
                    {username ? (
                        <Link className="hover:text-indigo-200 active:text-indigo-400" to={`/user/${username}`}>Minha página</Link>
                    ) : (
                        <Link className="hover:text-indigo-200 active:text-indigo-400" to="/">Home</Link>
                    )}
                    <Link className="hover:text-indigo-200 active:text-indigo-400" to="/admin">Editar Links</Link>
                </div>

                <button 
                className="text-white hover:text-indigo-200 active:text-indigo-400"
                onClick={handleLogout}>
                    <BiLogOut size={28}/>
                </button>
            </nav>
        </header>
    )
}