import { useState, useEffect } from "react"
import { useParams, Link } from "react-router"
import { fireStore } from "../../services/firebaseConnection"
import { collection, query, where, getDocs } from "firebase/firestore"
import { FaLink } from "react-icons/fa"

import { LinkProps } from "../admin"

export function UserPage() {

    const {username} = useParams()
    const [links, setLinks] = useState<LinkProps[]>([])
    const [copySucess, setCopySucess] = useState(false)

    useEffect(() => {

        const getUserId = async () => {

            const userRef = collection(fireStore, "users")
            const q = query(userRef, where("username", "==", username))

            const querySnapshot = await getDocs(q)
            if(!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0]
                const userId = userDoc.id;

                const linksRef = collection(fireStore, "links");
                const qLinks = query(linksRef, where("userId", "==", userId))
                const linkSnapshot = await getDocs(qLinks)

                const arr:LinkProps[] = [];
                linkSnapshot.forEach((item) => {
                    arr.push({
                        id: item.id,
                        name: item.data().name,
                        url: item.data().url,
                        bg: item.data().bg,
                        color: item.data().color,
                    })
                })
                setLinks(arr)
            }

        }

        if(username) {
            getUserId()
        }

      },[username])

    function handleCopyLink() {
        const sharebleLink = window.location.href;
        navigator.clipboard.writeText(sharebleLink)
        .then(() => {
            setCopySucess(true)
            setTimeout(() => {
                setCopySucess(false)
            }, 2000);
        })
        .catch(() => {
            console.log("Error ao copiar link")
        })
    }

    return (
        <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-indigo-900 via-violet-800 to-indigo-900 p-4">
            
            <header className="w-11/12 max-w-3xl text-center py-6">
                <h1 className="text-4xl font-bold text-white bg-black/30 rounded-md">
                    Links de <span className="bg-gradient-to-r from-violet-500 to-indigo-600 bg-clip-text text-transparent">{username}</span>
                </h1>
                <p className="text-zinc-300 mt-2">Clique em qualquer link para acessar!</p>
                
                <button onClick={handleCopyLink}>{copySucess ? "Link copiado!" : "Copiar link da página"}</button>

            </header>
            <section className="w-full max-w-3xl flex flex-col items-center">
                {links.length > 0 ? (
                    links.map((item) => (
                        <a
                        href={item.url} 
                        target="_blank" 
                        rel="noopenner noreferrer"
                        key={item.id}
                        className="w-11/12 flex items-center justify-center py-4 px-6 mb-4 bg-indigo-600 hover:bg-indigo-700 transition-all text-white font-semibold text-lg rounded-lg shadow-md"
                        style={{backgroundColor: item.bg, color: item.color}}
                        >
                        {item.name}
                        <FaLink className="ml-2 text-lg"/>
                        </a>    
                    ))
                ) : (
                    <div className="text-center mt-10">
                        <p className="text-zinc-300 text-lg">Nenhum link adicionado ainda...</p>
                        <p className="text-zinc-300 text-lg">Peça para <span className="text-white">{username} </span>
                         adicionar algo interessante!</p>
                    </div>
                )}
            </section>

            <footer className="w-full max-w-3xl mt-8 text-center pt-4">
                <p className="text-zinc text-sm">
                Criado com ❤️ por <Link to="/" className="text-indigo-300 font-semibold">Link Órbita</Link>
                </p>
            </footer>
        </main>
    )
}