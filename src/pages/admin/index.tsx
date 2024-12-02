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
    <div className="flex items-center flex-col min-h-screen pb-7 px-2 bg-gradient-to-r from-indigo-700 via-violet-800 to-indigo-700">
      <Header username={username}/>

      <form onSubmit={handleRegister} className="flex flex-col mt-8 mb-6 w-full max-w-xl bg-customGray p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-4">Adicionar novo link</h2>

        <label className="text-white font-medium mb-2">Nome do seu link:</label>
        <Input
        placeholder="digite o nome do seu link"
        value={nameLink}
        onChange={(e) => setNameLink(e.target.value)}
        className="p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 mb-4"
        />

        <label className="text-white font-medium mb-2">URL do seu link:</label>
        <Input
        type="url"
        placeholder="digite a url"
        value={urlLink}
        onChange={(e) => setUrlLink(e.target.value)}
        className="p-3 bg-zinc-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <section className="flex my-4 gap-5">

          <div className="flex items-center gap-2">

            <label className="text-white font-medium">Cor de fundo do link:</label>
            <input
            type="color"
            value={colorBackgroundLink}
            onChange={(e) => setColorBackgroundLink(e.target.value)}
            className="w-10 h-10 border-none cursor-pointer rounded-lg"
            />

          </div>

          <div className="flex gap-2 items-center">

            <label className="text-white font-medium">Cor do seu texto:</label>
            <input
            type="color"
            value={colorTextLink}
            onChange={(e) => setColorTextLink(e.target.value)}
            className="w-10 h-10 border-none cursor-pointer rounded-lg"
            />

          </div>

        </section>

        {nameLink !== "" && (
          <div className="mt-4 p-4 bg-zinc-400 rounded-lg">

            <label className="text-white font-medium mb-2">Veja como está ficando:</label>
            <article
            className="flex items-center justify-center rounded-md px-4 py-3"
            style={{backgroundColor: colorBackgroundLink}}
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
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg h-12 text-lg text-white font-medium flex justify-center items-center">
          Cadastrar
        </button>

      </form>

        <h2 className="font-bold text-white mb-4 text-2xl">Meus links:</h2>

        <div className="flex flex-col gap-4 w-full max-w-xl items-center">
        {links.map((item) => (
          <article 
          key={item.id}
          style={{backgroundColor: item.bg, color: item.color}}
          className="flex items-center justify-between w-11/12 max-w-xl shadow-md rounded-md py-3 px-2 mb-2 select-none">
            <p className="font-medium">{item.name}</p>
            <div>
              <button
              className="border border-dashed p-2 rounded-md bg-zinc-800 hover:bg-red-600 transition"
              onClick={() => handleDelete(item.id)}
              >
                <BiTrash color="#fff" size={18}/> 
              </button>
            </div>
          </article>
        ))}
        </div>

    </div>
  );
}
  