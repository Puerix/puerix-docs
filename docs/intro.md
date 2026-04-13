---
id: intro
title: Home
slug: /
---

Bem-vindo a documentacao da Puerix.

Aqui voce encontra o passo a passo para integrar sua aplicacao com os fluxos de verificacao de idade.

## Comece por aqui

Antes de integrar, garanta que voce ja possui:

- `tenant_id` (identificador da sua conta/tenant)
- `apiKey` (chave para autenticar chamadas na API)

## Como obter tenant_id e apiKey

1. Acesse o painel da Puerix em `https://www.puerix.com/dashboard`.
2. No bloco **Tenant ID**, copie o valor de `tenant_id`.
3. No bloco **Chave de API**, copie sua `apiKey` ativa.
4. Se necessario, gere uma nova chave no mesmo painel.

Esses dois valores sao usados da seguinte forma:

- `apiKey`: header `X-API-Key` nas chamadas backend para a API Puerix.
- `tenant_id`: identificacao do tenant em fluxos Web e em suporte operacional.

## Tipos de integracao

Este guia mostra como integrar a Puerix em tres cenarios:

- API: seu backend cria e consulta sessoes diretamente na Puerix API.
- Web: seu backend cria a sessao e redireciona o usuario para o fluxo web da Puerix.
- SDK: app mobile integra diretamente com os SDKs Android e iOS.

## Guia rapido de decisao

- Use **API** quando seu backend vai orquestrar tudo.
- Use **Web** quando quiser acelerar a entrega com fluxo hospedado da Puerix.
- Use **SDK** quando quiser experiencia nativa no app mobile.

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
