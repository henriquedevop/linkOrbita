import { Link } from "react-router"

export function Footer() {
    return (
        <footer className="bg-customGray py-10">
            <div className="container mx-auto px-5">
                <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">

                    <div className="mb-5 sm:mb-0">
                        <h3 className="text-3xl text-white font-bold">
                            Link<span className="text-primary"> Órbita</span>
                        </h3>
                        <p className="text-zinc-400 mt-2 max-w-sm">
                            Centralize todos os seus links em uma página personalizada e compartilhe com eficiência.
                       </p>
                    </div>

                    <nav>
                        <ul className="flex flex-col sm:flex-row gap-5 text-white font-medium">
                            <li>
                                <Link to="/" className="hover:text-primary">Home</Link>
                            </li>
                            <li>
                                <Link to="/login" className="hover:text-primary">Login</Link>
                            </li>
                            <li>
                                <Link to="/signup" className="hover:text-primary">Criar conta</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="mt-5 text-zinc-400 text-sm text-center sm:text-left gap-2">
                        &copy; {new Date().getFullYear()} Link Órbita. Todos os direitos reservados.
                        <p>Fale direto comigo: ghenriquedevop@gmail.com</p>
                        <p>Fale direto comigo: (71) 9 9901-3343</p>
                        <a href="https://github.com/henriquedevop" target="_blank"
                        className="text-zinc-300 hover:text-white">
                        Github</a>
                    </div>

                </div>
            </div>
        </footer>
    )
}