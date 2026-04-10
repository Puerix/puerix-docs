---
title: Webhook de Finalizacao
---

Voce pode informar `notification_url` na criacao da sessao para receber uma notificacao ao final do fluxo.

Importante: o campo `notification_url` ja e aceito no `POST /v1/sessions` e fica associado a sessao. A habilitacao do disparo do webhook depende da configuracao do seu ambiente com a equipe Puerix.

## Como configurar

No `POST /v1/sessions`, envie:

```json
{
  "notification_url": "https://parceiro.com/webhooks/puerix"
}
```

Recomendacoes para a URL:

- HTTPS obrigatorio.
- Endpoint publico e com alta disponibilidade.
- Resposta rapida (ideal < 2s) com HTTP `200`.

## Evento de finalizacao esperado

Quando a sessao chegar a um estado final, a Puerix pode enviar um `POST` para o endpoint configurado.

Estados finais:

- `approved`
- `denied`

Payload recomendado:

```json
{
  "event": "verification.completed",
  "timestamp": "2026-04-10T17:45:12.000Z",
  "data": {
    "sessionId": "abc123",
    "subject": "user-123",
    "status": "approved",
    "ageLimit": 18
  }
}
```

## Validacao e seguranca

Boas praticas no parceiro:

1. Validar origem da requisicao (assinatura HMAC ou allowlist de IP, conforme configurado no onboarding).
2. Tornar o processamento idempotente por `sessionId` + `event`.
3. Apos receber webhook, consultar `GET /v1/sessions/:id` para confirmar o resultado oficial.

## Reenvio

Se o endpoint nao responder `2xx`, o ideal e prever politica de retry com backoff para garantir entrega.

Fallback recomendado: mesmo com webhook habilitado, continue consultando `GET /v1/sessions/:id` para confirmacao final.
