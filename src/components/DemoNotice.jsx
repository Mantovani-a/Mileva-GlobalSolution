export default function DemoNotice({
  children = 'Dados e mapa ilustrativos para demonstração acadêmica. Não representam serviços oficiais ou informações em tempo real.',
}) {
  return (
    <p className="demo-notice" role="note">
      {children}
    </p>
  )
}
