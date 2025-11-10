import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-6">
        <h1 className="text-6xl font-bold text-emerald-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Página não encontrada
        </h2>
        <p className="text-gray-600 mb-8 max-w-md">
            Parece que a página que você está tentando acessar não existe ou foi movida.
        </p>
        <Link
            to="/"
            className="px-6 py-3 bg-emerald-500 text-white font-medium rounded-full hover:bg-emerald-600 transition-all"
        >
            Voltar para a Página Inicial
        </Link>
    </section>
  );
}

export default PageNotFound