# Estrutura do Projeto

```
├── Dockerfile
├── __tests__
│   ├── providers
│   │   ├── memory-password-hasher.provider.ts
│   │   └── memory-token.provider.ts
│   └── repositories
│   │   ├── memory-sessions.repository.ts
│   │   └── memory-users.repository.ts
├── biome.json
├── package-lock.json
├── package.json
├── source
│   ├── app.ts
│   ├── entities
│   │   ├── session.entity.spec.ts
│   │   ├── session.entity.ts
│   │   ├── user.entity.spec.ts
│   │   └── user.entity.ts
│   ├── helpers
│   │   ├── env.spec.ts
│   │   └── env.ts
│   ├── http
│   │   ├── controllers
│   │   ├── mappers
│   │   └── middlewares
│   ├── lib
│   ├── providers
│   │   ├── password-hasher.provider.ts
│   │   └── token.provider.ts
│   ├── repositories
│   │   ├── sessions.repository.ts
│   │   └── users.repository.ts
│   ├── server.ts
│   └── usecases
│   │   ├── create-account.usecase.spec.ts
│   │   ├── create-account.usecase.ts
│   │   ├── create-session.usecase.spec.ts
│   │   ├── create-session.usecase.ts
│   │   ├── errors
│   │   │   ├── invalid-credentials.error.ts
│   │   │   └── user-already-exists.error.ts
│   │   └── factories
│   │   │   ├── create-account.factory.ts
│   │   │   └── create-session.factory.ts
├── tsconfig.build.json
├── tsconfig.json
├── tsup.config.ts
└── vitest.config.ts
```
