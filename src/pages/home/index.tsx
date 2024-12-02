import { Link } from "react-router"
import { BiWorld, BiLink, BiShield } from "react-icons/bi"
import { FaPaintBrush, FaShare } from "react-icons/fa"

export function Home() {
    return (
        <div className="bg-bg min-h-screen">
            <header className="flex flex-col md:flex-row items-center justify-between p-5 md:p-10">
                <Link
                to="/"
                className="text-2xl md:text-3xl text-textColor font-bold">Link
                <span className="text-primary"> Órbita</span>    
                </Link>

                <Link 
                className="text-base md:text-lg text-bg font-medium bg-textColor rounded-md px-4 py-2 mt-2 md:mt-0"
                to="/login">Começe de graça</Link>
            </header>

            <main>
                <section className="mt-20 bg-hero-bg h-screen bg-no-repeat bg-cover w-full flex items-center flex-col text-center px-5">
                    <div className="mt-20 md:mt-32">
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold text-textColor max-w-xl md:max-w-3xl">Centralize todos os seus links</h1>
                    </div>
                    <div>
                        <h3
                        className="text-sm md:text-lg text-textColor font-medium max-w-xs md:max-w-lg mt-6"
                        ><strong>Concentre todos os seus links em um só lugar,</strong> e faça eles girarem na sua órbita. 
                        Crie uma página personalizada <strong>para compartilhar seus links de forma simples e eficiente.</strong></h3>
                    </div>
                    <div className="mt-10 md:mt-20">
                        <Link 
                        to="/login" 
                        className="text-sm md:text-2xl text-bg font-medium bg-textColor rounded-md px-6 py-2">
                        Começe agora</Link>
                    </div>
                </section>

                <section className="h-auto bg-bg w-full flex flex-col items-center px-5">

                    <h3 className="text-2xl md:text-3xl text-textColor font-semibold mb-10">Tudo que você precisa</h3>

                    <div className="flex flex-wrap justify-between gap-10 md:gap-52">

                        <div className="bg-customGray w-full md:w-72 h-auto flex flex-col items-center rounded-md border-2 
                        border-zinc-800 p-5">
                            <BiWorld size={50} className="bg-white rounded-md p-2"/>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <h4 className="text-textColor text-lg md:text-2xl">Links em um só lugar</h4> 
                                <p className="text-zinc-200 text-sm md:text-base text-center">
                                Organize todos os seus links em um único espaço, acessível de forma prática e profissional.    
                                </p>   
                            </div> 
                        </div>

                        <div className="bg-customGray w-full md:w-72 h-auto flex flex-col items-center rounded-md border-2 
                        border-zinc-800 p-5">
                            <FaPaintBrush size={50} className="bg-white rounded-md p-2"/>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <h4 className="text-textColor text-lg md:text-2xl">Personalização Total</h4> 
                                <p className="text-zinc-200 text-sm md:text-base text-center">
                                Escolha cores, cores de texto, de fundo e estilos para deixar seus links com a sua cara.    
                                </p>   
                            </div> 
                        </div>

                        <div className="bg-customGray w-full md:w-72 h-auto flex flex-col items-center rounded-md border-2 
                        border-zinc-800 p-5">
                            <FaShare size={50} className="bg-white rounded-md p-2"/>
                            <div className="flex flex-col items-center gap-2 mt-4">
                                <h4 className="text-textColor text-lg md:text-2xl text-center">Compartilhamento Simples</h4> 
                                <p className="text-zinc-200 text-sm md:text-base text-center">
                                Envie seu link único para todos e facilite o acesso às suas redes, serviços e projetos.    
                                </p>   
                            </div> 
                        </div>

                    </div>

                </section>

                <section className="bg-white py-10 mt-10">

                    <h3 
                    className="text-2xl md:text-3xl rounded-md font-semibold text-center mb-10">
                    O que nossos usuários dizem
                    </h3>
                    
                    <div className="flex flex-wrap justify-center gap-10 px-5 md:gap-52">

                        <div className="bg-customGray w-full md:w-72 rounded-md p-5 shadow-md">
                            <p className="text-zinc-200 mb-4">
                                Esse link órbita me ajudou em compartilhar e orgazinar meus links, obg.
                            </p>
                            <h4 className="text-white font-bold">- July Lopes</h4>
                        </div>

                        <div className="bg-customGray w-full md:w-72 rounded-md p-5 shadow-md">
                            <p className="text-zinc-200 mb-4">
                                Conheci esse site faz 1 semana e ja adorei, podem usar.
                            </p>
                            <h4 className="text-white font-bold">- Guilherme Almeida</h4>
                        </div>

                        <div className="bg-customGray w-full md:w-72 rounded-md p-5 shadow-md">
                            <p className="text-zinc-200 mb-4">
                                Estou usando no meu negocio e posso finalmente deixar os links organizados
                            </p>
                            <h4 className="text-white font-bold">- Anna Júlia</h4>
                        </div>

                    </div>
                    

                </section>

                <section className="bg-primary py-20">
                    <h3
                    className="text-2xl md:text-3xl text-white font-semibold text-center mb-10"
                    >Funcionalidades que fazem a diferença
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5">

                        <div className="text-center">
                            <BiWorld size={60} className="text-white mx-auto mb-4"/>
                            <h4 className="text-lg text-white font-bold">Página personalizada</h4>
                            <p className="text-white text-sm">
                            Crie uma página com links que representa sua identidade.
                            </p>
                        </div>

                        <div className="text-center">
                            <BiLink size={60} className="text-white mx-auto mb-4"/>
                            <h4 className="text-lg text-white font-bold">Integração com Redes</h4>
                            <p className="text-white text-sm">
                            Conecte suas redes sociais e torne tudo mais acessível.
                            </p>
                        </div>

                        <div className="text-center">
                            <BiShield size={60} className="text-white mx-auto mb-4"/>
                            <h4 className="text-lg text-white font-bold">Segurança Avançada</h4>
                            <p className="text-white text-sm">
                            Seus dados estão seguros com criptografia e autenticação confiável.
                            </p>
                        </div>
                    </div>

                </section>

            </main>
        </div>
    )
}