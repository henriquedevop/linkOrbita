import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { FormEvent, useEffect, useState } from "react"

import { fireStore } from "../../services/firebaseConnection"
import { setDoc, doc, getDoc } from "firebase/firestore"

export function Social() {

    const [urlFacebook, setUrlFacebook] = useState("")
    const [urlInstagram, setUrlInstagram] = useState("")
    const [urlYoutube, setUrlYoutube] = useState("")

    useEffect(() => {
        function loadLinks() {
            const docRef = doc(fireStore, "social", "links")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined) {
                    setUrlFacebook(snapshot.data()?.facebook)
                    setUrlInstagram(snapshot.data()?.instagram)
                    setUrlYoutube(snapshot.data()?.youtube)
                }
            })
            .catch((error) => {
                console.log("Erro ao renderizar links", error)
            })
        }

        loadLinks()
    },[])

    function handleRegister(e:FormEvent) {
        e.preventDefault()

        setDoc(doc(fireStore, "social", "links"), {
            facebook: urlFacebook,
            instagram: urlInstagram,
            youtube: urlYoutube,
        })
        .then(() => {
            alert("cadastrado")
        })
        .catch((error) => {
            console.log("Erro ao cadastrar links", error)
        })
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header/>

            <h1 className="text-white text-2xl font-medium mt-8 mb-4">Minhas redes sociais</h1>

            <form onSubmit={handleRegister} className="flex flex-col max-w-xl w-full">

                <label className="text-white font-medium my-2">Link do facebook</label>
                <Input
                type="url"
                placeholder="digite a url do facebook"
                value={urlFacebook}
                onChange={(e) => setUrlFacebook(e.target.value)}/>

                <label className="text-white font-medium my-2">Link do instagram</label>
                <Input
                type="url"
                placeholder="digite a url do facebook"
                value={urlInstagram}
                onChange={(e) => setUrlInstagram(e.target.value)}/>

                <label className="text-white font-medium my-2">Link do youtube</label>
                <Input
                type="url"
                placeholder="digite a url do facebook"
                value={urlYoutube}
                onChange={(e) => setUrlYoutube(e.target.value)}/>

                <button
                type="submit"
                className=" mb-7 bg-indigo-600 h-9 text-white rounded-md font-medium gap-4 flex justify-center items-center"
                >
                Salvar Links
                </button>

            </form>
        </div>
    )
}