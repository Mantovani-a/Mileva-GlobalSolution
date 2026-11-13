# Mileva

Front-end acadêmico CitizenTech da Global Solution FIAP 2026/2. O Mileva reúne mobilidade e informações urbanas em uma interface demonstrativa, com Pires do Rio – GO como cidade-piloto e João Carlos como usuário de exemplo.

O problema, o público-alvo, os recursos atuais e o planejamento de funcionalidades futuras estão na página Sobre. Impacto apresenta benefícios esperados e os ODS 10, 11, 12 e 13, sem atribuir resultados medidos ao projeto.

## Executar

Use Node.js 20.19+ na série 20 ou Node.js 22.12+ e npm, conforme os requisitos do Vite instalado.

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check:data
```

`dev` inicia o desenvolvimento. `build` gera `dist/`. `preview` permite consultar o build localmente. `check:data` verifica instâncias POO, IDs, coordenadas geográficas em Pires do Rio – GO e consistência dos registros demonstrativos com Node.js.

O refinamento visual pelas cinco referências atuais está descrito em [RECONSTRUCAO_VISUAL.md](docs/RECONSTRUCAO_VISUAL.md).

## Tecnologias

React e React DOM, React Router DOM, Leaflet (mapas interativos centrados em Pires do Rio – GO), Bootstrap 5 (grid e utilitários), Vite com o plugin React e Sass. O código prioriza Programação Orientada a Objetos (POO) em JavaScript/ES6+, HTML semântico, SCSS, SVG vetorial e APIs nativas do navegador. Não utiliza banco de dados ou autenticação real nesta etapa.

## Páginas e funcionalidades

| Caminho                               | Conteúdo                                                     |
| ------------------------------------- | ------------------------------------------------------------ |
| `/`                                   | Painel Demonstrativo com três entradas principais            |
| `/sobre`, `/impacto`, `/equipe`       | Projeto, roadmap futuro, impacto esperado e integrantes      |
| `/app`                                | Home aprovada, busca e quatro categorias                     |
| `/app/rotas`                          | Hub dos serviços e planejamento de funcionalidades futuras   |
| `/app/rotas/transporte`               | Filtros locais de linhas e seleção no mapa Leaflet           |
| `/app/rotas/transporte/:id`           | Paradas, horários e favorito da linha                        |
| `/app/rotas/caronas`                  | Filtros de trajeto, dia e horário com mapa Leaflet           |
| `/app/rotas/coleta`                   | Programação e polígono de área por região no Leaflet         |
| `/app/rotas/acessibilidade`           | Rotas e locais com filtros de recursos no Leaflet            |
| `/app/rotas/acessibilidade/:id`       | Recursos e limites da verificação fictícia                   |
| `/app/rotas/acessibilidade/solicitar` | Formulário validado em cinco etapas                          |
| `/app/rotas/acessibilidade/analise`   | Revisão temporária de pedidos fictícios                      |
| `/app/favoritos`, `/app/perfil`       | Itens salvos e Perfil demonstrativo                          |

A navegação inferior contém somente Início, Rotas, Favoritos e Perfil. A engrenagem abre aparência, Visualização Mobile, tela cheia e retorno ao Painel Demonstrativo. O Perfil também dá acesso ao mesmo painel. Endereços desconhecidos apresentam uma página de orientação.

## Testar a Visualização Mobile

1. Abra uma rota de `/app` em janela com pelo menos 768 px de largura.
2. Na engrenagem, ative **Visualização Mobile**.
3. Navegue no quadro de 390 px: mapas Leaflet, filtros, formulários e dock usam um viewport mobile real, com referência de altura de 844 px limitada pelo espaço da janela.
4. Use **Sair da visualização mobile**, acima do quadro, para voltar à rota atual com os parâmetros de consulta.

Em telas pequenas, o aplicativo usa o layout mobile diretamente. A prévia utiliza um iframe da mesma origem e bloqueia prévias aninhadas.

## Dados e privacidade da demonstração

Os quatro exemplos de transporte, quatro caronas, quatro regiões de coleta e seis registros de acessibilidade são instanciados como objetos de domínio (`TransitLine`, `RideOffer`, `CollectionRegion`, `AccessibleRecord`) e formam um catálogo polimórfico de **18 objetos**, usado na renderização dos Favoritos.

Os mapas utilizam Leaflet centrado em Pires do Rio – GO (`-17.3006, -48.2797`) com rotas, polígonos e paradas demonstrativas. Linhas, preços, horários, pessoas das caronas, locais, áreas e verificações são fictícios. Não há veículos em tempo real, reservas, contatos reais ou certificação de estabelecimentos.

O `localStorage` contém somente `mileva-theme` (claro/escuro) e `mileva-demo-favorites` (pares `type`/`id`). O cadastro não grava nome, e-mail ou evidências: JPG, PNG e PDF de até 5 MB ficam na memória da página e são descartados ao sair ou concluir.

## Arquitetura de Pastas (React + Vite)

- `src/components/`: componentes reutilizáveis de interface (mapa Leaflet, cabeçalhos, dock, busca, cartões e assistente flutuante `MiaChatWidget.jsx`).
- `src/pages/`: páginas das rotas institucionais e do aplicativo mobile.
- `src/layouts/`: estruturas institucional (`InstitutionalLayout.jsx`) e do aplicativo (`AppLayout.jsx`).
- `src/hooks/`: custom hooks do React (`useFavorites.js`).
- `src/data/`: dados estáticos e consultas do MVP (`transitData.js`, `ridesData.js`, `collectionData.js`, `accessibilityData.js`, `catalogData.js`, `homeData.js`, `miaData.js`, `teamData.js`).
- `src/models/`: modelos de domínio enxutos em POO (`UrbanModels.js`) para conversão geográfica e catálogo.
- `src/services/`: serviços de renderização do mapa interativo (`LeafletMapService.js`) e motor contextual da assistente urbana MIA (`MiaAssistantService.js`).
- `src/utils/`: funções utilitárias de tema (`theme.js`) e validação (`registrationValidation.js`).
- `src/styles/`: tokens, customização do Leaflet e estilos SCSS (`main.scss`, `app-visual.scss`).
- `public/img/`, `public/equipe/`: logos e fotografias usadas na interface.
- `scripts/`: verificação nativa dos dados demonstrativos (`check-demo-data.mjs`).

## Equipe

| Integrante        | Responsabilidade informada       |
| ----------------- | -------------------------------- |
| Davi Rabelo       | Technical Writer                 |
| Enzo Mitev        | Video Editor • 3D Designer       |
| Felipe Domingues  | Full Stack Developer             |
| Marcris Filho     | Front-end • UI/UX Designer       |
| Nicolas Mantovani | Tech Lead • Full Stack Developer |

Os dados editáveis estão em `src/data/teamData.js`.

## Integração e limites da auditoria

Consulte [INTEGRACAO.md](docs/INTEGRACAO.md) para a arquitetura POO e contratos esperados pelos componentes e [ETAPA07_AUDITORIA.md](docs/ETAPA07_AUDITORIA.md) para evidências, critérios verificados e limitações de testes.
