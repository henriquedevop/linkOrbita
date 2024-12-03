import { CgSpinner } from "react-icons/cg"

export function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
            <span className="text-white text-5xl animate-spin"><CgSpinner/></span>
            <span className="text-white text-xl animate-pulse">Carregando...</span>
        </div>
    )
}