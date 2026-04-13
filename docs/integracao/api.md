---
title: Integracao via API
---

A integracao via API e indicada para parceiros que querem controlar o fluxo no proprio backend.

## 1. Pre-requisitos

- `apiKey` do tenant.
- `tenant_id` da conta.
- URL base da API: `https://api.puerix.com/v1` (em dev, ajuste para seu ambiente).
- Header obrigatorio em todas as chamadas de sessao:

```http
X-API-Key: SUA_API_KEY
Content-Type: application/json
```

Como obter credenciais:

1. Entre no painel em `https://www.puerix.com/dashboard`.
2. Copie o `tenant_id` no bloco **Tenant ID**.
3. Copie a `apiKey` no bloco **Chave de API**.

## 2. Criar sessao

Use este endpoint para iniciar a verificacao.

### Endpoint

`POST /v1/sessions`

### Request

```bash
curl -X POST "https://api.puerix.com/v1/sessions" \
  -H "X-API-Key: SUA_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "user-123",
    "age_limit": 18,
    "callback_url": "https://parceiro.com/puerix/callback",
    "cancel_url": "https://parceiro.com/puerix/cancel",
    "notification_url": "https://parceiro.com/webhooks/puerix"
  }'
```

### Campos de entrada

- `subject` (string, obrigatorio): identificador unico do usuario no parceiro.
- `age_limit` (number, obrigatorio): idade minima permitida. Faixa aceita: 10 a 21.
- `callback_url` (url, opcional): URL para retorno em caso de sucesso no fluxo web.
- `cancel_url` (url, opcional): URL para retorno em caso de cancelamento no fluxo web.
- `notification_url` (url, opcional): URL para webhook de finalizacao.

### Resposta esperada (resumo)

```json
{
  "session": {
    "sessionId": "abc123",
    "status": "initiated",
    "subject": "user-123",
    "sessionToken": "...",
    "signature": "...",
    "expiresAt": "2026-04-10T18:00:00.000Z",
    "callbackUrl": "https://parceiro.com/puerix/callback",
    "cancelUrl": "https://parceiro.com/puerix/cancel",
    "notificationUrl": "https://parceiro.com/webhooks/puerix"
  }
}
```

Guarde pelo menos:

- `session.sessionId`
- `session.status`

## 3. Consultar sessao (resultado)

Use este endpoint para acompanhar status e obter o resultado final.

### Endpoint

`GET /v1/sessions/:id`

### Request

```bash
curl "https://api.puerix.com/v1/sessions/abc123" \
  -H "X-API-Key: SUA_API_KEY"
```

### Status possiveis

- `initiated`: sessao criada.
- `processing`: analise em andamento.
- `requires_doc`: precisa de etapa de documento.
- `approved`: aprovado.
- `denied`: reprovado.

### Resposta esperada (resumo)

```json
{
  "session": {
    "sessionId": "abc123",
    "status": "approved",
    "subject": "user-123"
  },
  "ageEstimation": {
    "ageLimit": 18,
    "estimatedAge": 22,
    "ageConfidence": 0.93
  },
  "liveness": {
    "isLive": true,
    "livenessScore": 0.97
  },
  "validateDoc": {
    "trueAge": 22,
    "birthdate": "2003-11-15T00:00:00.000Z"
  }
}
```

## 4. Fluxo recomendado (API)

1. Seu backend chama `POST /v1/sessions`.
2. Salva `sessionId` no seu banco.
3. Inicia fluxo do usuario (web ou app) com esse contexto.
4. Recebe webhook (quando configurado) e/ou consulta `GET /v1/sessions/:id`.
5. Finaliza sua logica de negocio com base em `session.status`.
