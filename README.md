# Mileva

Front-end acadêmico CitizenTech da Global Solution FIAP 2026/2. O Mileva reúne mobilidade e informações urbanas em uma interface demonstrativa, com Pires do Rio – GO como cidade-piloto e João Carlos como usuário de exemplo.

O problema, o público-alvo e a proposta estão na página Sobre. Impacto apresenta benefícios esperados e os ODS 10, 11, 12 e 13, sem atribuir resultados medidos ao projeto.

## Executar

Use Node.js 20.19+ na série 20 ou Node.js 22.12+ e npm, conforme os requisitos do Vite instalado.

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check:data
```

`dev` inicia o desenvolvimento. `build` gera `dist/`. `preview` permite consultar o build localmente. `check:data` verifica IDs, coordenadas e consistência dos registros demonstrativos com Node.js, sem biblioteca de testes.

O refinamento visual pelas cinco referências atuais está descrito em [RECONSTRUCAO_VISUAL.md](docs/RECONSTRUCAO_VISUAL.md).

## Tecnologias

React e React DOM, React Router DOM, Bootstrap 5 (grid e utilitários), Vite com o plugin React e Sass. O código usa JavaScript/JSX, HTML semântico, SCSS, SVG e APIs nativas do navegador. Não utiliza biblioteca cartográfica, banco de dados ou autenticação.

## Páginas e funcionalidades

| Caminho                               | Conteúdo                                          |
| ------------------------------------- | ------------------------------------------------- |
| `/`                                   | Painel Demonstrativo com três entradas principais |
| `/sobre`, `/impacto`, `/equipe`       | Projeto, impacto esperado e integrantes           |
| `/app`                                | Home aprovada, busca e quatro categorias          |
| `/app/rotas`                          | Hub dos serviços                                  |
| `/app/rotas/transporte`               | Filtros locais de linhas e seleção no mapa        |
| `/app/rotas/transporte/:id`           | Paradas, horários e favorito da linha             |
| `/app/rotas/caronas`                  | Filtros de trajeto, dia e horário                 |
| `/app/rotas/coleta`                   | Programação e área por região                     |
| `/app/rotas/acessibilidade`           | Rotas e locais com filtros de recursos            |
| `/app/rotas/acessibilidade/:id`       | Recursos e limites da verificação fictícia        |
| `/app/rotas/acessibilidade/solicitar` | Formulário validado em cinco etapas               |
| `/app/rotas/acessibilidade/analise`   | Revisão temporária de pedidos fictícios           |
| `/app/favoritos`, `/app/perfil`       | Itens salvos e Perfil demonstrativo               |

A navegação inferior contém somente Início, Rotas, Favoritos e Perfil. A engrenagem abre aparência, Visualização Mobile, tela cheia e retorno ao Painel Demonstrativo. O Perfil também dá acesso ao mesmo painel. Endereços desconhecidos apresentam uma página de orientação.

## Testar a Visualização Mobile

1. Abra uma rota de `/app` em janela com pelo menos 768 px de largura.
2. Na engrenagem, ative **Visualização Mobile**.
3. Navegue no quadro de 390 px: mapas, filtros, formulários e dock usam um viewport mobile real, com referência de altura de 844 px limitada pelo espaço da janela.
4. Use **Sair da visualização mobile**, acima do quadro, para voltar à rota atual com os parâmetros de consulta.

Em telas pequenas, o aplicativo usa o layout mobile diretamente. A prévia utiliza um iframe da mesma origem e bloqueia prévias aninhadas. A saída continua acessível durante a rolagem interna. Entrar/sair monta a interface novamente; rascunhos de formulários e seleções não persistidas devem ser concluídos antes de alternar a prévia.

## Dados e privacidade da demonstração

Os quatro exemplos de transporte, quatro caronas, quatro regiões de coleta e seis registros de acessibilidade formam um catálogo derivado de **18 objetos**, usado na renderização dos Favoritos. Cada módulo mantém seus dados em arquivos JavaScript separados.

Mapas são SVG esquemáticos sem precisão geográfica. Linhas, preços, horários, pessoas das caronas, locais, áreas e verificações são fictícios. Não há veículos em tempo real, reservas, contatos reais ou certificação de estabelecimentos. Recursos de pontos não garantem continuidade acessível do trajeto inteiro.

O `localStorage` contém somente `mileva-theme` (claro/escuro) e `mileva-demo-favorites` (pares `type`/`id`). O cadastro não grava nome, e-mail ou evidências: JPG, PNG e PDF de até 5 MB ficam na memória da página e são descartados ao sair ou concluir. Aprovações do painel de análise também são temporárias e não publicam locais.

## Organização

- `src/pages/`: telas e seus fluxos de apresentação.
- `src/components/`: mapa, navegação, configurações e componentes compartilhados.
- `src/layouts/`: estruturas institucional e do aplicativo.
- `src/css/`: tokens e estilos SCSS.
- `src/js/`: dados demonstrativos e utilitários de filtros, tema e favoritos.
- `public/img/`, `public/equipe/`: logos e fotografias usadas na interface.
- `design-references/`: referências originais, preservadas.
- `scripts/`: verificação nativa dos dados.
- `docs/`: auditoria e orientação para integração.

A formatação segue `.prettierrc.json`: dois espaços, aspas simples e JavaScript sem ponto e vírgula. O Prettier foi usado como ferramenta de edição, sem adicioná-lo às dependências do aplicativo. Para conferir a formatação: `npx prettier@3.6.2 --check "src/**/*.{js,jsx,scss}" scripts/check-demo-data.mjs index.html vite.config.js package.json`.

## Equipe

| Integrante        | Responsabilidade informada       |
| ----------------- | -------------------------------- |
| Davi Rabelo       | Technical Writer                 |
| Enzo Mitev        | Video Editor • 3D Designer       |
| Felipe Domingues  | Full Stack Developer             |
| Marcris Filho     | Front-end • UI/UX Designer       |
| Nicolas Mantovani | Tech Lead • Full Stack Developer |

Os dados editáveis estão em `src/js/teamData.js`. Não há link de pitch ou deploy confirmado nesta entrega.

## Integração e limites da auditoria

Consulte [INTEGRACAO.md](docs/INTEGRACAO.md) para os dados esperados pelos componentes e [ETAPA07_AUDITORIA.md](docs/ETAPA07_AUDITORIA.md) para evidências, critérios verificados e limitações de testes. Em uma hospedagem futura, as rotas do BrowserRouter precisam de fallback para `index.html`.

Backend, dados oficiais, georreferenciamento, validação de evidências, pesquisa e pitch dependem da equipe. Testes em dispositivos físicos, leitores de tela, Firefox e Safari continuam pendentes. Esta auditoria não certifica conformidade completa de acessibilidade nem substitui a conferência do edital oficial pela equipe.

## Créditos e uso de IA generativa

A interface carrega Poppins e Inter pelo Google Fonts; sem conexão, usa as fontes alternativas declaradas no SCSS. React, React Router, Bootstrap, Vite e Sass são as dependências declaradas em `package.json`. Ícones simples são SVG locais.

OpenAI Codex/ChatGPT foi utilizado nesta conversa para implementar, revisar, formatar, documentar e testar o front-end com base nas instruções do responsável. A equipe deve revisar o código e adequar esta declaração ao formulário exigido na entrega acadêmica. Não foram gerados rostos nesta implementação. Logos, fotografias e referências fornecidas foram preservadas; a autoria/proveniência dos assets fornecidos deve ser confirmada pela equipe se exigida pelo edital.
