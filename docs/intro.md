---
id: intro
title: Guia de Integracao Puerix
slug: /
---

Este guia mostra como integrar a Puerix em tres cenarios:

- API: seu backend cria e consulta sessoes diretamente na Puerix API.
- Web: seu backend cria a sessao e redireciona o usuario para o fluxo web da Puerix.
- SDK: app mobile integra diretamente com os SDKs Android e iOS.

## Diferenca principal entre Web e SDK

No fluxo Web:

1. Seu backend cria a sessao na Puerix API.
2. Seu sistema inicia o fluxo web da Puerix passando os dados da sessao.
3. Ao final, seu backend consulta o resultado da sessao na API.

No fluxo SDK:

1. O app inicializa o SDK com sua chave.
2. O proprio SDK cria e gerencia a sessao internamente.
3. O resultado retorna via callback do SDK.

## Endpoints cobertos neste guia

Este guia documenta apenas os dois endpoints usados para orquestrar e consultar o fluxo por API:

- `POST /v1/sessions`: cria sessao.
- `GET /v1/sessions/:id`: busca resultado/status da sessao.

Tambem ha uma secao sobre webhook de finalizacao via `notification_url`.
