# Integração futura do front-end

As páginas usam arrays locais. A equipe pode substituir esses dados mantendo os formatos abaixo. Não há cliente HTTP ou endpoint implementado.

## Mapa SVG

`RouteMap` recebe `routes`, `selectedRouteId` e `onSelectRoute(id)`. Cada rota contém `id`, `name` (ou `driver`), `color`, `points: [[x, y], ...]` e `stops: [{ id, name, x, y, detail }]`. O sistema de coordenadas é ilustrativo: largura 600 e altura 400. Não são latitude/longitude.

`area` aceita `{ points, color }`. `markers` pode fornecer a lista completa de pontos dos locais. `activeStopId` e `onSelectStop(id)` sincronizam seleção com a lista textual; reset pode enviar `null`. `serviceType` diferencia transporte, caronas e coleta. `status: 'unknown'` marca linha tracejada sem continuidade confirmada. `verified` no ponto serve somente aos exemplos aprovados.

Fontes geográficas reais precisarão de adaptação própria. Não basta inserir latitude/longitude nas coordenadas SVG.

## Dados dos módulos

| Base                   | Campos de apresentação                                                                                                     |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `demoTransit.js`       | `id`, `name`, `origin`, `destination`, `departure`, `period`, `duration`, `fare`, `accessibility`, geometria SVG           |
| `demoRides.js`         | `id`, `driver`, `origin`, `destination`, `days`, `time`, `period`, `seats`, geometria SVG                                  |
| `demoCollection.js`    | `id`, `name`, `days`, `window`, `area`, geometria SVG                                                                      |
| `demoAccessibility.js` | `id`, `kind`, `name`, `category`, `region`, `status`, `features`, `resources`, `reviewDate`, `limitation`, coordenadas SVG |

Mantenha IDs estáveis: Favoritos referencia os registros por `type`/`id`. O catálogo de 18 objetos é derivado dessas bases em `demoCatalog.js`; labels, links e categorias são calculados sem copiar registros manualmente. `npm run check:data` ajuda a detectar inconsistências.

## Persistência e solicitações

`useFavorites` reutiliza o localStorage existente, trata referências antigas e sincroniza alterações entre componentes e documentos da mesma origem. `visualPreferences.js` controla somente o tema. Não grave dados pessoais nessas chaves.

`AccessibilityRegistration` mantém os campos e arquivos em estado React temporário. A integração futura deve definir transporte, autorização, consentimento e tratamento das evidências junto à equipe responsável. Nenhum desses serviços está simulado como real no front-end.

`DemoVerificationPanel` altera apenas sua cópia temporária dos pedidos. Sua aprovação não certifica, persiste ou publica registros. A consulta pública usa somente exemplos previamente aprovados ou sem informação suficiente; pedidos pendentes não entram na lista.

## Hospedagem e entrega coletiva

Configure fallback de rotas para `index.html`. Confirme as fontes oficiais, pesquisas, pitch, proveniência dos assets e exigências do edital com a equipe. Não há URL de produção ou vídeo confirmada no código.
