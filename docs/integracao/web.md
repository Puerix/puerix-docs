---
title: Integracao via Web
---

A integracao Web usa sessao criada pelo parceiro e um redirecionamento para o fluxo hospedado da Puerix.

## Visao do fluxo

1. Seu backend cria a sessao via `POST /v1/sessions`.
2. Seu frontend redireciona o usuario para a URL de verificacao web da Puerix.
3. A Puerix executa liveness e, se necessario, etapa de documento.
4. Ao final, o usuario retorna para `callback_url` ou `cancel_url`.
5. Seu backend consulta `GET /v1/sessions/:id` para confirmar resultado final.

## Passo a passo

Antes de iniciar, obtenha suas credenciais no painel em `https://www.puerix.com/dashboard`:

- `tenant_id`: exibido no bloco **Tenant ID**.
- `apiKey`: exibida no bloco **Chave de API**.

## 1. Criar sessao no backend

Recomendacao: nunca criar sessao direto no frontend. Sempre no backend do parceiro.

Campos mais importantes:

- `subject`
- `age_limit`
- `callback_url`
- `cancel_url`
- `notification_url` (se quiser webhook)

## 2. Montar redirecionamento para o fluxo Web Puerix

A URL exata do fluxo web e fornecida pela equipe Puerix no seu onboarding.

No redirecionamento, envie os dados de contexto da sessao gerada.
Campos normalmente usados no fluxo:

- `tenantId`
- `sessionId`
- `signature`

Exemplo ilustrativo:

```text
https://app.puerix.com/start?tenantId=TENANT_ID&sessionId=SESSION_ID&signature=SIGNATURE
```

## 3. Tratar retorno no parceiro

Configure:

- `callback_url`: para sucesso/conclusao.
- `cancel_url`: para cancelamento.

No retorno, seu backend deve consultar `GET /v1/sessions/:id` para obter a decisao final oficial (`approved` ou `denied`).

## Boas praticas

- Nao confie apenas no retorno de navegador para decisao final.
- Sempre confirmar o status via API.
- Definir timeout/retry para consultas em caso de status `processing`.
- Persistir `sessionId` e `subject` para rastreabilidade.
