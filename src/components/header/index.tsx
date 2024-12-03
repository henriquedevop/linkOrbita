import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router"

import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2"

interface HeaderProps {
    username: string | null;
}

export function Header({ username }: HeaderProps) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                        <Link className="hidden sm:block hover:text-indigo-200 active:text-indigo-400" to={`/user/${username}`}>Minha página</Link>
                    ) : (
                        <Link className="hidden sm:block hover:text-indigo-200 active:text-indigo-400" to="/">Home</Link>
                    )}
                    <Link className="hidden sm:block hover:text-indigo-200 active:text-indigo-400" to="/admin">Editar Links</Link>
                    <Link className="hidden sm:block hover:text-indigo-200 active:text-indigo-400" to="/admin/settings">Configurações</Link>
                </div>

                <div className="sm:hidden flex items-left w-full">
                    <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                    <HiBars3 size={28}/>
                    </button>
                </div>

                <div
                    className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-black/80 p-6 rounded-lg shadow-lg backdrop-blur-lg border border-white/30`}
                >
                    <nav className="h-full w-full flex flex-col gap-6 font-semibold text-center">
                        {username ? (
                            <Link className="rounded-lg hover:text-indigo-200 active:text-indigo-400" to={`/user/${username}`}>Minha página</Link>
                        ) : (
                            <Link className="hover:text-indigo-200 active:text-indigo-400" to="/">Home</Link>
                        )}
                        <Link className="hover:text-indigo-200 active:text-indigo-400" to="/admin">Editar Links</Link>
                        <Link className="hover:text-indigo-200 active:text-indigo-400" to="/admin/settings">Configurações</Link>
                    </nav>
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