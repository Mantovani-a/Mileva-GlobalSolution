import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <section className="content-page">
      <p className="eyebrow">Página indisponível</p>
      <h1>Não encontramos esta página.</h1>
      <p>Use o início para continuar explorando o Mileva.</p>
      <Link className="text-link" to="/">
        Voltar ao Painel Demonstrativo
      </Link>
    </section>
  )
}
