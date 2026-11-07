# Auditoria final — Etapa 07

## 1. Estado geral

O build inicial passou. As etapas anteriores já continham páginas institucionais, Home, três módulos de serviços, acessibilidade, mapas SVG, Favoritos, Perfil e Configurações. A estrutura estava funcional, mas vários componentes e estilos tinham JSX, objetos e declarações compactados em linhas longas. Os únicos scripts iniciais eram `dev`, `build` e `preview`; não havia lint nem suíte de testes configurada.

## 2. Problemas corrigidos

- Cadastro: ao voltar e trocar de percurso para um local, início/fim antigos podiam permanecer na revisão. A troca de categoria agora limpa esses campos.
- Evidências: após selecionar um arquivo inválido, faltava uma ação para descartar o erro e continuar sem anexos. Remover arquivos agora também limpa a validação.
- Campos de seleção e grupo de recursos passaram a informar estado inválido; o foco consegue alcançar o primeiro controle ou grupo que precisa de correção. Os nomes acessíveis dos seletores permanecem estáveis quando aparece erro.
- A legenda agora reproduz o traçado interrompido dos percursos sem continuidade confirmada.
- Faltava favicon, causando uma requisição 404 no navegador. O símbolo oficial existente foi configurado como ícone.
- README desatualizado foi substituído por documentação do comportamento atual e dos limites reais.

## 3. Organização do código

JS/JSX e SCSS foram formatados com dois espaços, aspas simples e JavaScript sem ponto e vírgula. A configuração está em `.prettierrc.json`; assets e dependências ficam fora da formatação. Prettier foi usado como ferramenta de edição, sem dependência nova em `package.json`.

`MobilePreview` foi extraído de `App.jsx`, que mantém a declaração das rotas. A validação do cadastro passou a usar uma lista de campos por etapa, e o objeto vazio do formulário deixou de ser repetido. `PlaceholderPage.jsx` foi removido após confirmar ausência de referências. Fotos e logos não foram editadas; arquivos adicionais fornecidos em `public/` foram preservados.

`demoCatalog.js` deriva 18 objetos das quatro bases e fornece categorias, rótulos e links para renderizar Favoritos. Não há cópia manual dos mesmos dados. `scripts/check-demo-data.mjs` valida esse catálogo com Node.js nativo.

## 4. Melhorias de UI/UX

Composição visual e navegação foram preservadas. A organização do código não alterou o CSS compilado principal. Marcadores SVG receberam área transparente maior para interação; suas informações continuam disponíveis nas listas textuais. Mensagens de formulário orientam a correção e o descarte de arquivos inválidos. O dock mantém os quatro destinos e a reserva de espaço inferior existente.

Foram inspecionadas capturas da Home desktop e da Acessibilidade em 390 px no tema escuro. A auditoria visual não equivale a certificação de contraste ou teste com usuários.

## 5. Requisitos FIAP

A conferência abaixo usa os critérios fornecidos no prompt. O edital oficial integral não foi disponibilizado no repositório; sua redação, formato de entrega e critérios coletivos devem ser confirmados pela equipe.

| Critério informado                          | Evidência / situação                                                                                     |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Problema, solução e público-alvo            | Conteúdo de `/sobre`                                                                                     |
| ODS e impacto esperado                      | `/impacto`: ODS 10, 11, 12 e 13; sem estatísticas inventadas                                             |
| Pelo menos quatro páginas e navegação       | Rotas institucionais e do aplicativo verificadas                                                         |
| HTML semântico                              | Layouts com header/main/nav/footer, labels e títulos                                                     |
| Interatividade em JavaScript                | Buscas, filtros, mapas, favoritos, temas e formulário                                                    |
| Array de objetos com ao menos dez registros | `demoCatalog`: 18 objetos derivados e renderização dinâmica em Favoritos                                 |
| Formulário validado                         | Cadastro em cinco etapas, erros e confirmação dentro da página                                           |
| Responsividade                              | Sete larguras verificadas entre 320 e 1440 px                                                            |
| Acessibilidade                              | Foco, teclado, labels, alternativas textuais e movimento reduzido; auditoria assistiva completa pendente |
| Organização e README                        | Formatação padronizada, dados separados, documentação de integração                                      |
| Tecnologias autorizadas pelo prompt         | React/DOM, Router, Bootstrap, Sass, Vite/plugin React; sem biblioteca cartográfica ou backend            |
| Declaração de IA                            | Uso real de Codex/ChatGPT declarado no README                                                            |
| Pitch, pesquisas, entrega final             | Pendências coletivas; sem links inventados                                                               |

## 6. Testes

Execução local com Chrome/Chromium no Windows via Playwright já disponível no ambiente. Nenhuma biblioteca nova foi instalada para criar testes. O script de navegador foi temporário e removido após a execução.

- 17 rotas em 320, 360, 390, 430, 768, 1024 e 1440 px: 119 combinações, com título, logo e ausência de rolagem horizontal indevida.
- Tema escuro persistido nas 17 rotas.
- Home: busca encaminha destino ao Transporte; filtro Centro → Rodoviária retorna uma linha.
- Mapas: zoom, camada de pontos, seleção de marcador por Enter e detalhes correspondentes.
- Caronas: filtro de quinta-feira retorna duas ofertas.
- Coleta: trocar região altera a área do mapa e a programação.
- Acessibilidade: três marcadores na visualização Locais, filtro combinado, abertura de detalhes e favorito.
- Favoritos: três categorias salvas, persistência após recarregar e remoção imediata com o catálogo novo.
- Cadastro: validação e foco de erro, preenchimento, retorno entre etapas, troca de categoria, descarte de arquivo inválido, seleção de PNG temporário, revisão e envio fictício; nome de arquivo ausente do localStorage.
- Análise: solicitar correção, aprovar e rejeitar alteram somente a interface temporária.
- Perfil e Configurações: abertura pelo atalho, tema, entrada/saída de tela cheia, Escape, preview real de 390 px, navegação interna e saída na rota atual, retorno ao painel.
- Cinco fotografias carregadas e decodificadas.
- Ausência de erros de página e console nos fluxos da rodada final.

Comandos executados: `npm run build` (inicial e final), `npm run check:data`, Prettier com `--write` e `--check`, `git diff --check` e o script temporário de navegador.

Não testados nesta execução: Firefox, Safari, dispositivos físicos, leitores de tela reais, rede de produção, validação completa WCAG e uso com participantes. Nenhum resultado desses testes é presumido. Não havia scripts de lint ou testes preexistentes para executar.

## 7. Build

`npm run build` passou após a organização e as correções. A aplicação continua usando as dependências existentes. `npm run check:data` confirmou 18 registros, IDs únicos, coordenadas dentro do SVG e identificação/horário coerentes entre Home e Transporte.

## 8. Pendências da equipe

Confirmar edital oficial, pitch, entrega coletiva, pesquisas e fontes de impacto. Validar proveniência dos assets fornecidos se exigida. Integrar dados oficiais, georreferenciamento, backend, autenticação e análise real de evidências. Definir hospedagem com fallback de rotas. Essas integrações não pertencem à simulação atual.

## 9. Arquivos modificados

- Formatação de páginas, componentes, dados, utilitários e SCSS em `src/`.
- `App.jsx` e novo `components/MobilePreview.jsx`: separação da prévia.
- `AccessibilityRegistration.jsx`: validação, revisão e descarte de arquivos.
- `RouteMap.jsx`: legenda e área de interação dos pontos.
- `FavoritesPage.jsx` e novo `js/demoCatalog.js`: resolução de itens pelo catálogo.
- `package.json` e novo `scripts/check-demo-data.mjs`: checagem de dados, sem dependência adicional.
- `index.html`: favicon oficial.
- `.prettierrc.json`, `.prettierignore`, README e documentação.
- Removido somente o componente provisório sem referências `PlaceholderPage.jsx`.

## 10. Status final

Front-end demonstrativo pronto para revisão e integração da equipe, sem problema impeditivo encontrado nos fluxos testados. A conclusão se limita ao escopo local demonstrativo; depende das verificações manuais e integrações citadas acima. Não houve commit nem push automático.
