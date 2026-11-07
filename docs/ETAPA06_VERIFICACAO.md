# Verificação da Etapa 06

Executada em Chromium/Chrome local no Windows, com Playwright como ferramenta temporária de verificação. Nenhuma dependência foi adicionada ao projeto.

- Build de produção com Vite concluído.
- 17 rotas verificadas em 320, 360, 390, 430, 768, 1024 e 1440 px: título presente e ausência de rolagem horizontal (119 combinações).
- Tema escuro persistido nas 17 rotas, com inspeção visual do painel, Perfil e mapa de transporte.
- Perfil: atalhos para favoritos, preferências, configurações, Sobre e Painel Demonstrativo.
- Favoritos: adicionar, remover imediatamente, estado vazio e item ausente da base demonstrativa.
- Tela cheia: entrada, saída e recusa simulada da API, sem estado ativo incorreto.
- Prévia mobile: viewport interno de 390 px e preservação de parâmetro de oferta ao entrar/sair.
- Filtros de transporte, caronas e coleta; seleção de ponto pelo teclado.
- Cadastro: validação, foco de erro, preenchimento completo em tema escuro, seleção de arquivo e envio simulado. Arquivo não persistido no localStorage.
- Cinco fotos da equipe carregadas e decodificadas.
- Layout em orientação horizontal de 844 × 390 px.
- Nenhum erro de JavaScript de página nos fluxos automatizados.

## Auditoria da Etapa 07

Revisar com leitores de tela reais e dispositivos físicos, além de Firefox e Safari, que não foram testados nesta execução. A varredura automatizada de dimensões não substitui uma auditoria manual completa de contraste e usabilidade.

Continuam dependentes da equipe: dados oficiais e georreferenciados, fontes de horários e coleta, backend, autenticação e revisão real de evidências. Os mapas, serviços e aprovações atuais são demonstrativos.
