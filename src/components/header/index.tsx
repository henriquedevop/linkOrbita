import { BiLogOut } from "react-icons/bi"
import { Link } from "react-router"

import { auth } from "../../services/firebaseConnection"
import { signOut } from "firebase/auth"

export function Header() {

    async function handleLogout() {
        try {
            await signOut(auth)
            console.log("User deslogado com sucesso!")
        } catch(error) {
            console.log("error ao deslogar", error)
        }
    }

    return (
        <header className="w-full max-w-2xl mt-4 px-1">
            <nav className="w-full bg-white h-12 flex items-center justify-between rounded-md px-3">
                <div className="flex gap-4 font-medium">
                    <Link to="/">Home</Link>
                    <Link to="/admin">Meus links</Link>
                    <Link to="/admin/social">Redes sociais</Link>
                </div>

                <button onClick={handleLogout}>
                    <BiLogOut size={28} color="#000"/>
                </button>
            </nav>
        </header>
    )
}