import { useState, useEffect } from "react"
import { useParams } from "react-router"
import { fireStore } from "../../services/firebaseConnection"
import { collection, query, where, getDocs } from "firebase/firestore"

import { LinkProps } from "../admin"

export function UserPage() {

    const {username} = useParams()
    const [links, setLinks] = useState<LinkProps[]>([])

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

    return (
        <main className="flex flex-col items-center min-h-screen p-4">
            <h1 className="text-white">Links de {username}</h1>
            {links.length > 0 ? (
                links.map((item) => (
                    <a
                    href={item.url} target="_blank" 
                    key={item.id}
                    className="flex items-center justify-center w-11/12 max-w-xl rounded-md py-3 px-2 mb-2"
                    style={{backgroundColor: item.bg, color: item.color}}
                    >
                    {item.name}
                    </a>
                ))
            ) : (
                <span>Adicione algo</span>
            )}
        </main>
    )
}