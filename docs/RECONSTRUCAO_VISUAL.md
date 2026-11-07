# Reconstrução visual pelas cinco referências

As imagens atuais em `design-references/` foram inspecionadas como especificação de composição. Nenhuma imagem foi usada como fundo da interface; as telas continuam sendo React, SVG e SCSS.

## Telas

| Tela           | Alterações                                                                                                                                                                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home           | Logo central, menu à esquerda e sino à direita; saudação, subtítulo e cidade compactos; busca arredondada, grade 2×2 e cartão com previsão fictícia de 5 min. Removidos os títulos extras “Explore o Mileva” e “O que você procura?”.                            |
| Transporte     | Cabeçalho com ícone; Origem/Destino e inversão antes do mapa; duas linhas iniciais, demais acessíveis em “Ver todas as linhas”. Horário e informações complementares ficam em controles expansíveis.                                                             |
| Carona Diária  | Busca compacta com dias; mapa horizontal; cartões com avatar, nome, percurso, dias/horário, vagas e seta. Favoritar aparece na oferta selecionada. Filtro por horário continua disponível.                                                                       |
| Acessibilidade | Cabeçalho, controle Rotas/Locais, mapa e cartão principal com recursos individuais, Ver detalhes e Registro secundário. Recursos não cadastrados aparecem como “Não informado”. Filtros, outros resultados e análise demonstrativa permanecem acessíveis abaixo. |
| Perfil         | Cartão superior do usuário e lista clara com Favoritos, Configurações, Modo escuro, Tela cheia, Sobre e Equipe. Os toggles usam o mesmo comportamento das configurações existentes.                                                                              |

## Componentes e estilos

- `AppHeader.jsx`: topo compartilhado com logo oficial, retorno e controles; menu abre o painel existente. O sino abre o estado vazio de notificações da demonstração.
- `ModuleTitle.jsx`: título compacto com ícone reutilizado nas consultas.
- `AppDock.jsx`: mapa e estrela como ícones, cápsula translúcida, blur, borda clara e destaque turquesa menor com indicador inferior. Mantidos os quatro destinos.
- `RouteMap.jsx`: mesmo mecanismo e dados, com modo compacto, zoom sobre o mapa e camadas/legenda recolhíveis. Quadras menores e nomes ilustrativos melhoram a aparência cartográfica.
- `SettingsPanel.jsx` e `visualPreferences.js`: controles inline no Perfil e sincronização do tema entre eles e o painel.
- `app-visual.scss`: apresentação do aplicativo com escopo próprio, preservando os estilos institucionais existentes.
- Atualizados `AppLayout`, as cinco páginas, ícones, busca e resumo do próximo ônibus.

## Prévia mobile

A moldura mantém a razão 390/844, com largura entre 320 e 390 px conforme a altura disponível. Em janelas baixas, a página externa pode rolar, mantendo a saída sticky; a largura interna não desce de 320 px. Não há barra de status, bateria, Dynamic Island ou aparelho fictício dentro da interface. A logo, os campos e o dock respondem ao viewport real do iframe.

## Validação executada

- `npm run build`: passou.
- `npm run check:data`: passou, 18 registros consistentes.
- Chrome/Chromium via Playwright já disponível: cinco telas em 320, 390, 768 e 1440 px, sem rolagem horizontal.
- Home em 390×844: cartão Próximo ônibus acima do dock na primeira dobra.
- Ordem de Transporte: busca, mapa e resultados.
- Buscas, filtros de Carona/Acessibilidade, seleção, zoom, camadas e Favoritos funcionais.
- Menu, notificações, tema sincronizado, tela cheia e navegação da prévia testados.
- Rotas institucionais, Coleta, cadastro e análise continuam abrindo.
- Prévia em janela de 1440×720: proporção preservada, largura mínima de 320 px e sem rolagem horizontal interna.
- Capturas das cinco telas foram inspecionadas em 390 px para comparar composição e proporções.

## Limites

Os mapas são esquemáticos, não georreferenciados. Nomes, horários, caronas e recursos continuam demonstrativos. Os recursos não informados não foram inventados para reproduzir o mockup. A previsão de 5 min é um exemplo visual, sem relação com veículos ou relógio reais. Dados essenciais adicionais continuam acessíveis por expansão ou detalhes.

Não foram testados aparelhos físicos, Safari ou Firefox nesta execução. A fidelidade visual é aproximada: a marca oficial foi preservada, e fontes/renderização podem variar conforme o navegador. Não houve nova dependência, backend, commit ou push.
