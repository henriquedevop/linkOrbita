import { useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

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
        
        <div className="flex items-center justify-between flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
          <label className="text-white font-medium mt-2 mb-3">Veja como está ficando:</label>
          <article
          className="w-11/12 max-w-lg flex flex-col items-center justify-between rounded-md px-1 py-3"
          style={{marginBlock: 8, backgroundColor: colorBackgroundLink}}
          >
            <p
            className="font-medium"
            style={{color: colorTextLink}}
            >Canal do youtube</p>
          </article>
        </div>

      </form>
    </div>
  );
}
  