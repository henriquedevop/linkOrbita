import { useState, useEffect } from "react"
import { SocialMedia } from "../../components/socialmedia"
import { LinkProps } from "../admin"

import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa"

import { fireStore } from "../../services/firebaseConnection"
import { getDocs, collection, orderBy, query, doc, getDoc } from "firebase/firestore"
import { Link } from "react-router"

interface SocialLinksProps {
    facebook: string;
    instagram: string;
    youtube: string;
}

export function Home() {

    const [Links, setLinks] = useState<LinkProps[]>([])
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {

        function loadLinks() {
            const linksRef = collection(fireStore, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))

            getDocs(queryRef)
            .then((snapshot) => {
                let arr = [] as LinkProps[]

                snapshot.forEach((item) => {

                    arr.push({
                        id: item.id,
                        name: item.data().name,
                        url: item.data().url,
                        bg: item.data().bg,
                        color: item.data().color,
                    })

                })
                setLinks(arr)
            })
            .catch((error) => {
                console.log("Error ao buscar dados", error)
            })
        }

        loadLinks()

    },[])

    useEffect(() => {
        function loadSocial() {

            const docRef = doc(fireStore, "social", "links")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setSocialLinks({
                        facebook: snapshot.data()?.facebook,
                        instagram: snapshot.data()?.instagram,
                        youtube: snapshot.data()?.youtube,
                    })
                }
            })
            .catch(() => {
    
            })
        }

        loadSocial()

    },[])

    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Link Orbita</h1>
            <span className="text-gray-50 mb-5 mt-3">Crie a sua</span>
            <Link to="/signup">AQUI</Link>

            {socialLinks && Object.keys(socialLinks).length > 0 && (
                <footer className="flex justify-center gap-3 my-4">
                    <SocialMedia url={socialLinks?.facebook}>
                        <FaYoutube size={35} color="#fff"/>
                    </SocialMedia>
    
                    <SocialMedia url={socialLinks?.instagram}>
                        <FaInstagram size={35} color="#fff"/>
                    </SocialMedia>
    
                    <SocialMedia url={socialLinks?.youtube}>
                        <FaTiktok size={35} color="#fff"/>
                    </SocialMedia>
                </footer>
            )}
            
        </div>
    )
}