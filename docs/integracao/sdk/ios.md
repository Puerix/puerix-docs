---
title: SDK iOS
---

Repositorio: [github.com/Puerix/puerix-sdk-ios](https://github.com/Puerix/puerix-sdk-ios)

## Requisitos

- iOS 13.0+
- Xcode 14+
- Swift 5.7+
- API key — solicite em [puerix.com](https://puerix.com)

## Instalacao

### CocoaPods

```ruby
# Podfile
pod 'PuerixSDK', :git => 'https://github.com/Puerix/puerix-sdk-ios.git', :tag => '0.2.0'
```

Depois execute:

```bash
pod install
```

> O Google ML Kit e baixado automaticamente como dependencia.

### Swift Package Manager

No Xcode: **File > Add Package Dependencies** e insira:

```
https://github.com/Puerix/puerix-sdk-ios.git
```

> **Nota:** Google ML Kit nao suporta SPM. Instale separadamente via CocoaPods:
> ```ruby
> pod 'GoogleMLKit/FaceDetection', '~> 6.0'
> ```

## Uso rapido

```swift
import PuerixAuth
```

### 1. Inicializar o SDK

Chame uma vez, idealmente no `AppDelegate`:

```swift
PuerixSDK.shared.initialize(config: PuerixConfig(
    apiKey: "SUA_API_KEY",
    environment: .production,  // ou .development
    enableLogging: true        // false em producao
))
```

### 2. Verificacao completa (recomendado)

Inicia o fluxo completo: sessao → liveness → upload → documento (se necessario) → resultado.

```swift
PuerixSDK.shared.startVerification(
    from: viewController,
    subject: "user-123",
    ageLimit: 18
) { result in
    if result.isApproved {
        print("Aprovado! Session: \(result.sessionId)")
    } else {
        print("Nao aprovado: \(result.status)")
        if let error = result.errorMessage {
            print("Erro: \(error)")
        }
    }
}
```

## Customizacao visual

As telas nativas usam a **paleta Puerix por padrao**. Para adequa-las a identidade visual do seu app, defina `PuerixTheme.active` **antes** do `initialize`:

```swift
PuerixTheme.active = PuerixTheme(
    primary:    UIColor(red: 0.85, green: 0.11, blue: 0.38, alpha: 1), // acoes primarias
    accent:     UIColor(red: 1.00, green: 0.43, blue: 0.00, alpha: 1), // destaque / "detectando"
    success:    UIColor(red: 0.00, green: 0.78, blue: 0.33, alpha: 1), // sucesso / step OK
    text:       PuerixTheme.default.text,        // mantem o padrao Puerix
    background: PuerixTheme.default.background    // mantem o padrao Puerix
)

PuerixSDK.shared.initialize(config: PuerixConfig(apiKey: "SUA_API_KEY"))
```

### Tokens de cor

| Token | Default Puerix | Onde aparece |
|-------|----------------|--------------|
| `primary` | `#2C7DA0` | Acoes primarias, captura de documento |
| `accent` | `#61C0BF` | Borda "detectando", destaques |
| `success` | `#468C8B` | Borda OK, steps concluidos, textos de sucesso |
| `text` | `#1A3B5D` | Labels escuros sobre fundo claro |
| `background` | `#F4F7F6` | Fundos claros |

## Referencia da API

### PuerixConfig

| Parametro | Tipo | Padrao | Descricao |
|-----------|------|--------|-----------|
| `apiKey` | `String` | — | Chave de API (obrigatorio) |
| `environment` | `.production` / `.development` | `.production` | Ambiente da API |
| `baseUrl` | `String?` | `nil` | URL customizada (usa o padrao do environment) |
| `timeout` | `TimeInterval` | `30` | Timeout de rede em segundos |
| `enableLogging` | `Bool` | `false` | Habilita logs no console |

### startVerification

```swift
func startVerification(
    from viewController: UIViewController,
    subject: String,               // Identificador do usuario
    ageLimit: Int = 18,            // Idade minima (10-21)
    steps: [PuerixLivenessStep],   // Passos do liveness
    stepDuration: TimeInterval = 3,// Duracao por passo
    callbackUrl: String? = nil,    // URL de callback (opcional)
    cancelUrl: String? = nil,      // URL de cancelamento (opcional)
    completion: @escaping (PuerixVerificationResult) -> Void
)
```

### PuerixVerificationResult

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `sessionId` | `String` | ID da sessao no backend |
| `status` | `String` | `approved`, `denied`, `requires_doc`, `cancelled` |
| `isApproved` | `Bool` | Se a verificacao foi aprovada |
| `errorMessage` | `String?` | Mensagem de erro (se houver) |

### PuerixLivenessStep

| Step | Descricao |
|------|-----------|
| `.lookAtCamera` | Olhar para a camera |
| `.turnHeadLeft` | Virar a cabeca para a esquerda |
| `.turnHeadRight` | Virar a cabeca para a direita |

## Fluxo de verificacao

```
┌─────────────┐     ┌──────────┐     ┌──────────────┐     ┌──────────────┐
│  Iniciar    │────>│ Liveness │────>│   Upload     │────>│  Resultado   │
│ Verificacao │     │ (3 steps)│     │   Frames     │     │  approved/   │
└─────────────┘     └──────────┘     └──────┬───────┘     │  denied      │
                                            │              └──────────────┘
                                            │ requires_doc
                                            v
                                     ┌──────────────┐     ┌──────────────┐
                                     │  Documento   │────>│  Validacao   │
                                     │ (frente+verso│     │  CPF + foto  │
                                     │  + OCR CPF)  │     └──────────────┘
                                     └──────────────┘
```

## Permissoes

Adicione ao `Info.plist`:

```xml
<key>NSCameraUsageDescription</key>
<string>Necessario para verificacao de identidade</string>
```

## Troubleshooting

| Erro | Causa | Solucao |
|------|-------|---------|
| `401 Unauthorized` | API key invalida | Verifique a chave no painel Puerix |
| `403 Forbidden` | Limite atingido ou conta bloqueada | Verifique seu plano |
| `Session token nao disponivel` | `startVerification` sem `initialize` | Chame `initialize()` primeiro |
| Camera permission denied | Usuario negou acesso | Adicione `NSCameraUsageDescription` |
