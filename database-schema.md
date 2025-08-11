# Diagrama Entidade-Relacionamento - TokenVerde

## 📊 DER do Banco de Dados

```mermaid
erDiagram
    users {
        string id PK
        string email UK
        string password
        string name
        enum role
        datetime createdAt
        datetime updatedAt
    }

    properties {
        string id PK
        string name
        string description
        string address
        float latitude
        float longitude
        float area
        string matriculaImovel
        string car
        string georreferenciamento
        enum status
        datetime createdAt
        datetime updatedAt
        string ownerId FK
    }

    green_areas {
        string id PK
        string name
        string description
        float area
        json coordinates
        enum status
        datetime createdAt
        datetime updatedAt
        string propertyId FK
    }

    tokens {
        string id PK
        string name
        string symbol
        int totalSupply
        float price
        enum status
        datetime createdAt
        datetime updatedAt
        string greenAreaId FK
        string propertyId FK
    }

    token_holders {
        string id PK
        int quantity
        datetime createdAt
        datetime updatedAt
        string userId FK
        string tokenId FK
    }

    transactions {
        string id PK
        enum type
        float amount
        int quantity
        enum status
        datetime createdAt
        datetime updatedAt
        string userId FK
        string tokenId FK
    }

    environmental_reports {
        string id PK
        string title
        string description
        json data
        datetime createdAt
        datetime updatedAt
        string greenAreaId FK
        string authorId FK
    }

    %% Relacionamentos
    users ||--o{ properties : "owns"
    users ||--o{ token_holders : "holds"
    users ||--o{ transactions : "performs"
    users ||--o{ environmental_reports : "authors"

    properties ||--o{ green_areas : "contains"
    properties ||--o{ tokens : "generates"

    green_areas ||--o{ tokens : "tokenizes"
    green_areas ||--o{ environmental_reports : "reports"

    tokens ||--o{ token_holders : "held_by"
    tokens ||--o{ transactions : "traded"

    %% Constraints
    token_holders }o--|| users : "user"
    token_holders }o--|| tokens : "token"
    transactions }o--|| users : "user"
    transactions }o--|| tokens : "token"
    environmental_reports }o--|| users : "author"
    environmental_reports }o--|| green_areas : "area"
```

## 🔑 Enums Utilizados

### UserRole
- `ADMIN` - Administrador do sistema
- `INVESTIDOR` - Investidor que compra tokens
- `PROPERTY_OWNER` - Proprietário de terras

### PropertyStatus
- `PENDING` - Aguardando aprovação
- `APPROVED` - Aprovada
- `REJECTED` - Rejeitada
- `ACTIVE` - Ativa
- `INACTIVE` - Inativa

### GreenAreaStatus
- `ACTIVE` - Ativa
- `INACTIVE` - Inativa
- `UNDER_AUDIT` - Em auditoria

### TokenStatus
- `ACTIVE` - Ativo
- `INACTIVE` - Inativo
- `PAUSED` - Pausado

### TransactionType
- `BUY` - Compra
- `SELL` - Venda
- `TRANSFER` - Transferência

### TransactionStatus
- `PENDING` - Pendente
- `COMPLETED` - Concluída
- `FAILED` - Falhou
- `CANCELLED` - Cancelada

## 📋 Observações do Schema

### Chaves Primárias
- Todas as entidades usam `id` como chave primária (tipo `string` com `@default(cuid())`)

### Chaves Estrangeiras
- `properties.ownerId` → `users.id`
- `green_areas.propertyId` → `properties.id`
- `tokens.greenAreaId` → `green_areas.id`
- `tokens.propertyId` → `properties.id`
- `token_holders.userId` → `users.id`
- `token_holders.tokenId` → `tokens.id`
- `transactions.userId` → `users.id`
- `transactions.tokenId` → `tokens.id`
- `environmental_reports.greenAreaId` → `green_areas.id`
- `environmental_reports.authorId` → `users.id`

### Constraints Especiais
- `users.email` - Único
- `token_holders` - Unique constraint em `[userId, tokenId]`
- `properties` - Coordenadas obrigatórias (latitude/longitude)
- `green_areas` - Coordenadas em formato JSON para polígonos
- `tokens` - Vinculado tanto à área verde quanto à propriedade

### Campos de Auditoria
- Todas as entidades principais possuem `createdAt` e `updatedAt`
- Timestamps automáticos com `@default(now())` e `@updatedAt`
