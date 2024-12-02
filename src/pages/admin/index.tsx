import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { BiTrash } from "react-icons/bi";

import { fireStore, auth } from "../../services/firebaseConnection"
import { addDoc, collection, onSnapshot, query, doc, deleteDoc, where, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export interface LinkProps {
  id: string,
  name: string,
  url: string,
  bg: string,
  color: string,
}

export function Admin() {

  const [userId, setUserID] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  const [nameLink, setNameLink] = useState("")
  const [urlLink, setUrlLink] = useState("")
  const [colorBackgroundLink, setColorBackgroundLink] = useState("#f1f1f1")
  const [colorTextLink,setColorTextLink] = useState("#020202")

  const [links, setLinks] = useState<LinkProps[]>([])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
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

    console.log(userId)
    return () => unsubscribe()
  },[])

  useEffect(() => {

    const linksRef = collection(fireStore, "links")
    const q = query(linksRef, where("userId", "==", userId))

    const unSub = onSnapshot(q, (snapshop) => {

      let arr: LinkProps[] = []

      snapshop.forEach((item) => {
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

    return () => unSub()

  },[userId])

  function handleRegister(e:FormEvent) {
    e.preventDefault()

    if(nameLink === "" || urlLink === "") {
      alert("Preencha todos os campos!")
      return
    } 

    if(userId) {
      addDoc(collection(fireStore, "links"), {
        name: nameLink,
        url: urlLink,
        bg: colorBackgroundLink,
        color: colorTextLink,
        created: new Date(),
        userId: userId,
      })
      .then(() => {
        console.log("Cadastrado com sucesso")
        setNameLink("");
        setUrlLink("");
        setColorBackgroundLink("#f1f1f1");
        setColorTextLink("#020202");
      })
      .catch((error) => {
        console.log("Error ao cadastrar", error)
      })
    }

  }

  function handleDelete(id: string) {
    const docRef = doc(fireStore, "links", id)
    deleteDoc(docRef)
    .then(() => {
        setLinks(links.filter(link => link.id !== id))
        console.log("Link deletado com sucesso!")
    })
    .catch((error) => {
        console.error("Erro ao deletar o link:", error)
    })
  }

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header username={username}/>

      <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-3 w-full max-w-xl">

        <label className="text-white font-medium mt-2 mb-2">Nome do seu link:</label>
        <Input
        placeholder="digite o nome do seu link"
        value={nameLink}
        onChange={(e) => setNameLink(e.target.value)}
        />

        <label className="text-white font-medium mt-2 mb-2">Url do seu link:</label>
        <Input
        type="url"
        placeholder="digite a url"
        value={urlLink}
        onChange={(e) => setUrlLink(e.target.value)}
        />

        <section className="flex my-4 gap-5">

          <div className="flex gap-2">

            <label className="text-white font-medium mt-2 mb-2">Cor de fundo do link:</label>
            <input
            type="color"
            value={colorBackgroundLink}
            onChange={(e) => setColorBackgroundLink(e.target.value)}
            />

          </div>

          <div className="flex gap-2">

            <label className="text-white font-medium mt-2 mb-2">Cor do seu texto:</label>
            <input
            type="color"
            value={colorTextLink}
            onChange={(e) => setColorTextLink(e.target.value)}
            />

          </div>

        </section>

        {nameLink !== "" && (
          <div className="flex items-center justify-between flex-col mb-7 p-1 border-gray-100/25 border rounded-md">

            <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
            <article
            className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded-md px-1 py-3"
            style={{marginBlock: 8, backgroundColor: colorBackgroundLink}}
            >
              <p
              className="font-medium"
              style={{color: colorTextLink}}
              >{nameLink}</p>
            </article>

        </div>
        )}

        <button
        type="submit"
        className=" mb-7 bg-indigo-600 h-9 text-white rounded-md font-medium gap-4 flex justify-center items-center">
          Cadastrar
        </button>

      </form>

        <h2 className="font-bold text-white mb-4 text-2xl">Meus links:</h2>

        {links.map((item) => (
          <article 
          key={item.id}
          style={{backgroundColor: item.bg, color: item.color}}
          className="flex items-center justify-between w-11/12 max-w-xl rounded-md py-3 px-2 mb-2 select-none">
            <p>{item.name}</p>
            <div>
              <button
              className="border border-dashed p-1 rounded-md"
              onClick={() => handleDelete(item.id)}
              >
                <BiTrash color="#fff" size={18}/> 
              </button>
            </div>
          </article>
        ))}

    </div>
  );
}
  