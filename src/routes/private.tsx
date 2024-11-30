import { ReactNode, useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { auth } from "../services/firebaseConnection"
import { onAuthStateChanged } from "firebase/auth"

interface PrivateProps {
    children: ReactNode
}

export function Private({ children }: PrivateProps): any {

    const [loading, setLoading] = useState(true)
    const [signed, setSigned] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        const unSub = onAuthStateChanged(auth, (user) => {

            if(user) {

                const userData = {
                    uid: user?.uid,
                    email: user?.email 
                }

                localStorage.setItem("linkOrbita", JSON.stringify(userData))
                setLoading(false)
                setSigned(true)

            } else {
                setLoading(false)
                setSigned(false)
            }

        })
        
        return () => {
            unSub()
        }

    },[])

    useEffect(() => {
        if(!loading && !signed) {
            navigate("/login")
        }
    }, [loading, signed, navigate])

    if(loading) {
        return <div>carregando</div>
    }

    return signed ? children : null
}