---
title: Integracao via SDK (Android e iOS)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

O SDK nativo Puerix oferece verificacao de idade com deteccao de vida (liveness) e captura de documentos diretamente no dispositivo, sem redirecionamento web.

## Repositorios

| Plataforma | Repositorio | Versao |
|------------|-------------|--------|
| **Android** | [github.com/Puerix/puerix-sdk-android](https://github.com/Puerix/puerix-sdk-android) | `0.2.0` |
| **iOS** | [github.com/Puerix/puerix-sdk-ios](https://github.com/Puerix/puerix-sdk-ios) | `0.2.0` |

## Funcionalidades

- **Liveness Detection** — Verificacao facial com rastreamento de rosto e movimentos da cabeca
- **Captura de Documento** — Frente e verso com guia visual e verificacao de qualidade
- **OCR** — Extracao automatica do CPF via reconhecimento de texto
- **Integracao com API** — Sessao, upload de frames, validacao de documento
- **UI nativa** — Telas prontas com branding Puerix e tema personalizavel

## Quando escolher SDK

| Cenario | SDK | Web |
|---------|-----|-----|
| UX nativa no app | ✅ | ❌ |
| Menor dependencia de redirecionamento | ✅ | ❌ |
| Fluxo encapsulado no mobile | ✅ | ❌ |
| Integracao unica browser + mobile | ❌ | ✅ |
| Menos esforco de manutencao por plataforma | ❌ | ✅ |

## Proximos passos

- [Integracao Android](./android)
- [Integracao iOS](./ios)
