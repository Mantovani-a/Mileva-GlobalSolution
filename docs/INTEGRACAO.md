# Integração futura do front-end e Arquitetura POO

A aplicação utiliza uma arquitetura em **Programação Orientada a Objetos (POO)** dividida em Modelos de Domínio (`src/core/models/`), Repositórios (`src/core/repositories/`), Serviços (`src/core/services/`) e Seeds de Dados (`src/data/`). Não há banco de dados nem cliente HTTP ativo nesta etapa, mas toda a camada de repositórios foi estruturada para substituição direta por chamadas de API/Banco de Dados.

## Mapa Interativo com Leaflet (`LeafletMapService` e `RouteMap`)

O componente `RouteMap` encapsula o **Leaflet** por meio da classe `LeafletMapService` (`src/core/services/LeafletMapService.js`), centrada na cidade-piloto de **Pires do Rio – GO** (`[-17.3006, -48.2797]`).

A classe de valor `GeoCoordinate` (`src/core/models/GeoCoordinate.js`) mantém coordenadas híbridas:
- `lat` e `lng`: coordenadas geográficas reais na malha urbana de Pires do Rio – GO para renderização de `L.polyline`, `L.polygon` e `L.marker` no Leaflet.
- `x` e `y`: coordenadas proporcionais (`600 × 400`) preservadas para validação de integridade e camada de acessibilidade por teclado.

## Hierarquia de Classes e Repositórios

| Classe de Modelo         | Repositório Correspondente     | Responsabilidade                                                                          |
| ------------------------ | ------------------------------ | ----------------------------------------------------------------------------------------- |
| `UrbanServiceEntity`     | `BaseRepository`               | Superclasse abstrata de todos os serviços urbanos catalogáveis                            |
| `TransitLine`            | `TransitRepository`            | Linhas de ônibus, itinerários, paradas e busca por origem/destino/período                 |
| `RideOffer`              | `RideRepository`               | Ofertas de caronas recorrentes com filtros de trajeto, dia da semana e horário            |
| `CollectionRegion`       | `CollectionRepository`         | Regiões de coleta seletiva, polígonos de área atendida e materiais                        |
| `AccessibleRecord`       | `AccessibilityRepository`      | Rotas e locais acessíveis com recursos, limitações e estado de verificação                |
| `AccessibilityRequest`   | `AccessibilityRepository`      | Pedidos de cadastro comunitário e transição de estados de revisão                         |
| `PlannedFeature`         | `PlannedFeaturesRepository`    | Especificação das funcionalidades futuras previstas na página Sobre                       |

Mantenha IDs estáveis: `FavoritesRepository` referencia os registros por `type`/`id`. O catálogo de 18 objetos é derivado polimorficamente pelo `CatalogRepository` através do método `toCatalogEntry()` de cada subclasse. `npm run check:data` verifica as instâncias das classes, os IDs e os limites geográficos.

## Persistência Local e Serviços

- `FavoritesRepository` (`src/core/repositories/FavoritesRepository.js`) gerencia a chave `mileva-demo-favorites` no `localStorage` com fallback em memória.
- `ThemePreferenceService` (`src/core/services/ThemePreferenceService.js`) gerencia o tema claro/escuro na chave `mileva-theme`.
- `RegistrationFormService` (`src/core/services/RegistrationFormService.js`) encapsula as regras de validação em 5 etapas e verificação de arquivos temporários em memória.

## Hospedagem e evolução para Banco de Dados

Configure fallback de rotas para `index.html`. Para conectar um banco de dados futuro, implemente métodos assíncronos nas subclasses de `BaseRepository` consumindo a API oficial sem necessidade de alterar a árvore de componentes React.
