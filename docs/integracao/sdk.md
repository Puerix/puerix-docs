---
title: Integracao via SDK (Android e iOS)
---

A integracao por SDK e indicada quando o app mobile deve controlar toda a experiencia no dispositivo.

Diferenca para Web: no SDK, a sessao e criada internamente pelo proprio SDK.

## Android

Resumo do passo a passo:

1. Instalar dependencia do SDK.
2. Inicializar o SDK no `Application` ou bootstrap do app.
3. Iniciar verificacao via `startVerification(...)`.
4. Tratar callback de resultado no `onActivityResult`.

Exemplo de inicializacao:

```kotlin
PuerixSDK.initialize(PuerixConfig(
    apiKey = "SUA_API_KEY",
    environment = PuerixEnvironment.PRODUCTION,
    enableLogging = false
))
```

Exemplo de inicio do fluxo:

```kotlin
PuerixSDK.startVerification(
    activity = this,
    requestCode = 1234,
    subject = "user-123",
    ageLimit = 18
)
```

## iOS

Resumo do passo a passo:

1. Instalar via CocoaPods ou Swift Package Manager.
2. Inicializar `PuerixSDK.shared.initialize(...)` no startup do app.
3. Chamar `startVerification(...)` com `subject` e `ageLimit`.
4. Tratar callback de conclusao.

Exemplo de inicializacao:

```swift
PuerixSDK.shared.initialize(config: PuerixConfig(
    apiKey: "SUA_API_KEY",
    environment: .production,
    enableLogging: false
))
```

Exemplo de inicio do fluxo:

```swift
PuerixSDK.shared.startVerification(
    from: viewController,
    subject: "user-123",
    ageLimit: 18
) { result in
    print(result.status)
}
```

## Quando escolher SDK

Escolha SDK quando:

- voce quer UX nativa no app.
- quer menor dependencia de redirecionamento web.
- deseja fluxo encapsulado no mobile.

Escolha Web quando:

- quer uma integracao unica para browser/mobile web.
- quer reduzir esforco de manutencao por plataforma.
