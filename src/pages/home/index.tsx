import { SocialMedia } from "../../components/socialmedia"

import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa"

export function Home() {
    return (
        <div className="flex flex-col w-full py-4 items-center justify-center">
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">Henrique devop</h1>
            <span className="text-gray-50 mb-5 mt-3">veja meus links</span>

            <main className="flex flex-col w-11/12 max-w-xl text-center">
                <section className="bg-white mb-4 w-full py-2 select-none rounded-lg transition-transform hover:scale-105 cursor-pointer">
                    <a>
                        <p className="text-base md:text-lg">
                            Canal no youtube
                        </p>
                    </a>
                </section>
            </main>

            <footer className="flex justify-center gap-3 my-4">
                <SocialMedia url="https://www.youtube.com/">
                    <FaYoutube size={35} color="#fff"/>
                </SocialMedia>

                <SocialMedia url="https://www.instagram.com/">
                    <FaInstagram size={35} color="#fff"/>
                </SocialMedia>

                <SocialMedia url="https://www.tiktok.com/">
                    <FaTiktok size={35} color="#fff"/>
                </SocialMedia>
            </footer>
            
        </div>
    )
}