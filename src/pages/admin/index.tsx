import { useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { BiTrash } from "react-icons/bi";

export function Admin() {

  const [nameLink, setNameLink] = useState("")
  const [urlLink, setUrlLink] = useState("")
  const [colorBackgroundLink, setColorBackgroundLink] = useState("#f1f1f1")
  const [colorTextLink,setColorTextLink] = useState("#020202")

  return (
    <div className="flex items-center flex-col min-h-screen pb-7 px-2">
      <Header/>

      <form className="flex flex-col mt-8 mb-3 w-full max-w-xl">

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

        <article 
        style={{backgroundColor: "#039fff", color: "#fff"}}
        className="flex items-center justify-between w-11/12 max-w-xl rounded-md py-3 px-2 mb-2 select-none">
          <p>Meu instagram</p>
          <div>
            <button
            className="border border-dashed p-1 rounded-md"
            >
              <BiTrash color="#fff" size={18}/> 
            </button>
          </div>
        </article>

    </div>
  );
}
  