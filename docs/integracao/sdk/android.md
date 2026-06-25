---
title: SDK Android
---

Repositorio: [github.com/Puerix/puerix-sdk-android](https://github.com/Puerix/puerix-sdk-android)

## Requisitos

- Android API 21+ (Android 5.0)
- Kotlin 1.8+
- Java 17
- API key — solicite em [puerix.com](https://puerix.com)

## Instalacao

### 1. Adicionar o repositorio Maven

```gradle
// settings.gradle
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven { url 'https://raw.githubusercontent.com/Puerix/puerix-sdk-android/main/maven-repo' }
    }
}
```

### 2. Adicionar a dependencia

```gradle
// app/build.gradle
dependencies {
    implementation 'com.puerix:puerix-sdk:0.2.0'
}
```

### 3. Sincronizar o projeto

```bash
./gradlew sync
```

> **Nota:** Se estiver usando Kotlin 2.0+, adicione ao `app/build.gradle`:
> ```gradle
> kotlinOptions {
>     freeCompilerArgs += ['-Xskip-metadata-version-check']
> }
> ```

## Uso rapido

### 1. Inicializar o SDK

Chame uma vez, idealmente no `Application.onCreate()`:

```kotlin
import com.puerix.puerix_sdk.PuerixSDK
import com.puerix.puerix_sdk.PuerixConfig
import com.puerix.puerix_sdk.PuerixEnvironment

PuerixSDK.initialize(PuerixConfig(
    apiKey = "SUA_API_KEY",
    environment = PuerixEnvironment.PRODUCTION,  // ou DEVELOPMENT
    enableLogging = true                          // false em producao
))
```

### 2. Verificacao completa (recomendado)

Inicia o fluxo completo: sessao → liveness → upload → documento (se necessario) → resultado.

```kotlin
class MainActivity : AppCompatActivity() {

    companion object {
        private const val RC_VERIFICATION = 1234
    }

    private fun startVerification() {
        PuerixSDK.startVerification(
            activity = this,
            requestCode = RC_VERIFICATION,
            subject = "user-123",
            ageLimit = 18,
        )
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        PuerixSDK.handleVerificationResult(
            requestCode, resultCode, data,
            myRequestCode = RC_VERIFICATION
        ) { result ->
            if (result.isApproved) {
                Log.d("Puerix", "Aprovado! Session: ${result.sessionId}")
            } else {
                Log.d("Puerix", "Nao aprovado: ${result.status}")
                result.errorMessage?.let { Log.e("Puerix", "Erro: $it") }
            }
        }
    }
}
```

## Customizacao visual

As telas nativas usam a **paleta Puerix por padrao**. Para adequa-las a identidade visual do seu app, defina `PuerixTheme.active` **antes** do `initialize`:

```kotlin
PuerixTheme.active = PuerixTheme(
    primary = Color.parseColor("#6750A4"),      // acoes primarias
    accent = Color.parseColor("#9A82DB"),       // destaque / "detectando"
    success = Color.parseColor("#2E7D32"),      // sucesso / step OK
    text = PuerixTheme.DEFAULT.text,            // mantem o padrao Puerix
    background = PuerixTheme.DEFAULT.background, // mantem o padrao Puerix
)

PuerixSDK.initialize(PuerixConfig(apiKey = "SUA_API_KEY"))
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
| `environment` | `PRODUCTION` / `DEVELOPMENT` | `PRODUCTION` | Ambiente da API |
| `baseUrl` | `String?` | `null` | URL customizada (usa o padrao do environment) |
| `timeoutMs` | `Long` | `30000` | Timeout de rede em milissegundos |
| `enableLogging` | `Boolean` | `false` | Habilita logs no Logcat |

### startVerification

```kotlin
fun startVerification(
    activity: Activity,
    requestCode: Int,
    subject: String,                    // Identificador do usuario
    ageLimit: Int = 18,                 // Idade minima (10-21)
    steps: List<PuerixLivenessStep>,    // Passos do liveness
    stepDuration: Long = 10_000L,       // Duracao por passo (ms)
)
```

### PuerixVerificationResult

| Propriedade | Tipo | Descricao |
|-------------|------|-----------|
| `sessionId` | `String` | ID da sessao no backend |
| `status` | `String` | `approved`, `denied`, `requires_doc`, `cancelled` |
| `isApproved` | `Boolean` | Se a verificacao foi aprovada |
| `errorMessage` | `String?` | Mensagem de erro (se houver) |

### PuerixLivenessStep

| Step | Key | Descricao |
|------|-----|-----------|
| `LOOK_AT_CAMERA` | `lookAtCamera` | Olhar para a camera |
| `TURN_HEAD_LEFT` | `turnHeadLeft` | Virar a cabeca para a esquerda |
| `TURN_HEAD_RIGHT` | `turnHeadRight` | Virar a cabeca para a direita |

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

O SDK declara as permissoes automaticamente no `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.INTERNET" />
```

A permissao de camera e solicitada em runtime automaticamente pelo SDK.

## Troubleshooting

| Erro | Causa | Solucao |
|------|-------|---------|
| `401 Unauthorized` | API key invalida | Verifique a chave no painel Puerix |
| `403 Forbidden` | Limite atingido ou conta bloqueada | Verifique seu plano |
| `Incompatible classes in dependencies` | Versao Kotlin incompativel | Adicione `-Xskip-metadata-version-check` |
| `Session token nao disponivel` | `startVerification` sem `initialize` | Chame `initialize()` primeiro |
| Camera permission denied | Usuario negou acesso | O SDK solicita automaticamente |
