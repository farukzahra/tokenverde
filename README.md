# TokenVerde - Plataforma de Tokenização de Áreas Verdes

## Visão Geral

O TokenVerde é uma plataforma inovadora que permite a tokenização de áreas verdes, conectando investidores ambientalmente conscientes com projetos de preservação e reflorestamento. A plataforma desburocratiza o processo de compensação ambiental oferecendo áreas pré-selecionadas, documentadas e tokenizadas para agilizar aprovações de projetos de supressão vegetal.

## ✨ Status do Projeto

**🟢 PROJETO EM FUNCIONAMENTO**

### Implementado e Funcionando:
- ✅ Sistema completo de autenticação (JWT)
- ✅ API REST completa com todas as rotas
- ✅ Interface responsiva com Vue.js 3 + Tailwind CSS
- ✅ Banco de dados PostgreSQL com Prisma ORM
- ✅ Sistema de upload de documentos PDF
- ✅ Dashboard diferenciado por tipo de usuário
- ✅ CRUD completo de propriedades
- ✅ Sistema de tokens e transações
- ✅ Painel administrativo
- ✅ Sistema de seed automático

## 🛠️ Stack Tecnológica

### Frontend
- **Vue.js 3** - Framework progressivo com Composition API
- **Vue Router** - Roteamento com guards de autenticação
- **Tailwind CSS** - Estilização responsiva
- **Axios** - Cliente HTTP com interceptors
- **Vite** - Build tool e dev server

### Backend
- **Node.js + Express.js** - API REST
- **PostgreSQL** - Banco de dados principal
- **Prisma** - ORM com migrações automáticas
- **JWT** - Autenticação stateless
- **Multer** - Upload de arquivos
- **Bcrypt** - Hash de senhas
- **Express Validator** - Validação de dados

### DevOps & Ferramentas
- **Git** - Controle de versão
- **ESLint + Prettier** - Linting e formatação
- **Nodemon** - Hot reload em desenvolvimento
- **CORS** - Configurado para requisições cross-origin

## 🚀 Funcionalidades Implementadas

### 👤 Sistema de Usuários
- ✅ **Autenticação completa** - Login/Registro com JWT
- ✅ **3 tipos de usuário** - Admin, Investidor, Proprietário
- ✅ **Guards de rota** - Proteção baseada em roles
- ✅ **Gestão de perfis** - Dados do usuário e configurações

### 🏡 Gestão de Propriedades  
- ✅ **CRUD completo** - Criar, listar, editar, deletar propriedades
- ✅ **Upload de documentos** - Matrícula, CAR, Georreferenciamento (PDF)
- ✅ **Sistema de aprovação** - Status: Pendente, Aprovado, Rejeitado
- ✅ **Coordenadas geográficas** - Latitude/longitude para mapeamento
- ✅ **Gestão de áreas** - Área total em hectares

### 🌳 Áreas Verdes & Tokens
- ✅ **Áreas verdes vinculadas** - Reserva Legal e APP por propriedade
- ✅ **Tokenização automática** - Tokens gerados por área verde
- ✅ **Sistema de preços** - Cálculo baseado na área
- ✅ **Token holders** - Controle de propriedade de tokens
- ✅ **Transações** - Compra, venda e transferência

### 💼 Dashboard Inteligente
- ✅ **Admin Dashboard** - Estatísticas e gestão de propriedades
- ✅ **Investidor Dashboard** - Portfólio de tokens e transações
- ✅ **Proprietário Dashboard** - Gestão de propriedades cadastradas
- ✅ **Métricas em tempo real** - Valores, quantidades, áreas

### 📊 Sistema de Relatórios
- ✅ **Relatórios ambientais** - Por área verde com dados detalhados
- ✅ **Histórico de transações** - Completo com filtros
- ✅ **Estatísticas administrativas** - Propriedades por status
- ✅ **Dados de biodiversidade** - Informações de impacto ambiental

## 🗄️ Estrutura do Banco de Dados

### Tabelas Implementadas

#### 👥 users
- **id** (String) - Identificador único
- **email** (String) - Email único
- **password** (String) - Hash da senha
- **name** (String) - Nome completo
- **role** (Enum) - ADMIN, INVESTIDOR, PROPERTY_OWNER
- **createdAt/updatedAt** - Timestamps

#### 🏡 properties  
- **id** (String) - Identificador único
- **name** (String) - Nome da propriedade
- **description** (String) - Descrição opcional
- **address** (String) - Endereço completo
- **latitude/longitude** (Float) - Coordenadas GPS
- **area** (Float) - Área em hectares
- **matriculaImovel** (String) - PDF em Base64
- **car** (String) - Cadastro Ambiental Rural (PDF)
- **georreferenciamento** (String) - Memorial descritivo (PDF)
- **status** (Enum) - PENDING, APPROVED, REJECTED, ACTIVE, INACTIVE
- **ownerId** (String) - FK para users

#### 🌳 green_areas
- **id** (String) - Identificador único
- **name** (String) - Nome da área (ex: "Reserva Legal")
- **description** (String) - Descrição da área
- **area** (Float) - Área em hectares
- **coordinates** (JSON) - Coordenadas dos polígonos
- **status** (Enum) - ACTIVE, INACTIVE, UNDER_AUDIT
- **propertyId** (String) - FK para properties

#### 🪙 tokens
- **id** (String) - Identificador único
- **name** (String) - Nome do token
- **symbol** (String) - Símbolo (ex: "TGV1")
- **totalSupply** (Int) - Supply total
- **price** (Float) - Preço unitário em R$
- **status** (Enum) - ACTIVE, INACTIVE, PAUSED
- **greenAreaId/propertyId** (String) - FKs

#### 👤 token_holders
- **id** (String) - Identificador único
- **quantity** (Int) - Quantidade de tokens
- **userId** (String) - FK para users
- **tokenId** (String) - FK para tokens
- **Constraint**: Unique(userId, tokenId)

#### 💱 transactions
- **id** (String) - Identificador único
- **type** (Enum) - BUY, SELL, TRANSFER
- **amount** (Float) - Valor em R$
- **quantity** (Int) - Quantidade de tokens
- **status** (Enum) - PENDING, COMPLETED, FAILED, CANCELLED
- **userId/tokenId** (String) - FKs

#### 📊 environmental_reports
- **id** (String) - Identificador único
- **title** (String) - Título do relatório
- **description** (String) - Descrição
- **data** (JSON) - Dados estruturados do relatório
- **greenAreaId** (String) - FK para green_areas
- **authorId** (String) - FK para users

## 🏗️ Arquitetura Implementada

### Frontend (Vue.js 3)
```
frontend/src/
├── views/               # Páginas principais
│   ├── Home.vue        # ✅ Landing page responsiva
│   ├── Login.vue       # ✅ Autenticação
│   ├── Register.vue    # ✅ Cadastro de usuários  
│   ├── Dashboard.vue   # ✅ Dashboard inteligente por role
│   ├── Profile.vue     # ✅ Perfil do usuário
│   ├── Map.vue         # ✅ Mapa das propriedades
│   ├── Admin.vue       # ✅ Painel administrativo
│   ├── PropertyForm.vue # ✅ Cadastro de propriedades
│   ├── PropertyEdit.vue # ✅ Edição de propriedades
│   └── ComoFunciona.vue # ✅ Página informativa
├── config/
│   └── axios.js        # ✅ Configuração da API
├── router/
│   └── index.js        # ✅ Rotas com guards
└── assets/
    └── main.css        # ✅ Estilos globais
```

### Backend (Node.js + Express)
```
backend/src/
├── routes/              # Rotas da API
│   ├── auth.js         # ✅ Login, registro, JWT
│   ├── users.js        # ✅ CRUD usuários
│   ├── properties.js   # ✅ CRUD propriedades + upload
│   ├── tokens.js       # ✅ Gestão de tokens
│   ├── transactions.js # ✅ Transações
│   └── setup.js        # ✅ Setup inicial
├── middleware/
│   └── auth.js         # ✅ Verificação JWT
├── config/             # Scripts de configuração
│   ├── prisma.js       # ✅ Cliente Prisma
│   ├── seed.js         # ✅ Seed básico
│   ├── seed-complete.js # ✅ Seed completo
│   └── run-seed.js     # ✅ Executor de seed
└── server.js           # ✅ Servidor principal
```

### Banco de Dados (PostgreSQL + Prisma)
```
backend/prisma/
├── schema.prisma       # ✅ Schema completo
└── migrations/         # ✅ Migrações aplicadas
    ├── 20250728143026_init/
    └── 20250728143431_update_investor_to_investidor/
```

## 📅 Roadmap do Projeto

### ✅ Fase 1 - MVP (CONCLUÍDA)
- ✅ Setup completo do projeto
- ✅ Sistema de autenticação JWT
- ✅ CRUD completo de propriedades
- ✅ Interface responsiva
- ✅ Sistema de tokens funcional
- ✅ Dashboard por tipo de usuário
- ✅ Upload de documentos PDF
- ✅ Banco de dados estruturado

### 🚧 Fase 2 - Funcionalidades Avançadas (EM DESENVOLVIMENTO)
- 🔄 Integração com mapas interativos (Leaflet)
- 🔄 Sistema de marketplace de tokens
- 🔄 Relatórios ambientais detalhados
- 🔄 Sistema de notificações em tempo real
- 🔄 Dashboard com gráficos e métricas
- 🔄 API de integração para terceiros

### 📋 Fase 3 - Recursos Premium (PLANEJADA)
- 📋 Integração com blockchain (Ethereum)
- 📋 Smart contracts para tokens
- 📋 Auditoria ambiental automatizada
- 📋 Integração com dados de satélite
- 📋 Sistema de gamificação
- 📋 Aplicativo móvel
- 📋 Integração com órgãos ambientais

## 🌱 Impacto Ambiental

### Benefícios Diretos
- **🌳 Preservação Real** - Cada token representa área verde conservada
- **📊 Transparência Total** - Todos os dados são rastreáveis e auditáveis  
- **💰 Incentivo Econômico** - Proprietários são remunerados pela preservação
- **📈 Impacto Mensurável** - Relatórios detalhados de biodiversidade
- **🌍 Escalabilidade Global** - Modelo replicável em qualquer região
- **⚡ Desburocratização** - Processo ágil de compensação ambiental

## 💼 Modelo de Negócio

### Receitas Implementadas
- **📄 Taxa de Cadastro** - Por propriedade validada
- **🪙 Taxa de Tokenização** - 3-5% sobre valor tokenizado
- **💱 Taxa de Transação** - 1-2% sobre compra/venda de tokens
- **🎯 Serviços Premium** - Relatórios avançados e consultoria

### Receitas Futuras
- **📱 Assinatura Premium** - Recursos avançados para investidores
- **🔍 Serviços de Auditoria** - Validação técnica especializada
- **🔌 API para Terceiros** - Integração com outras plataformas
- **🤝 Parcerias Corporativas** - Grandes empresas e consultorias

## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

### 1. Clone e Configure
```bash
git clone <repository-url>
cd tokenverde

# Backend
cd backend
cp config.example.js config.js  # Configure suas variáveis
npm install
npx prisma migrate dev
npm run seed  # Popular banco com dados de teste
npm run dev

# Frontend (novo terminal)
cd ../frontend  
npm install
npm run dev
```

### 2. Credenciais de Teste
```
Admin: admin@tokenverde.com / admin123
Investidor: joao.silva@email.com / investor123
Proprietário: maria.santos@email.com / owner123
```

### 3. Acessar a Aplicação
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5001
- **Prisma Studio**: npx prisma studio

## 📚 Documentação da API

### Autenticação
```bash
POST /api/auth/register  # Registro
POST /api/auth/login     # Login
```

### Propriedades  
```bash
GET    /api/properties           # Listar
POST   /api/properties           # Criar (com upload)
PUT    /api/properties/:id       # Atualizar
DELETE /api/properties/:id       # Deletar
PATCH  /api/properties/:id/status # Aprovar/Rejeitar (Admin)
```

### Tokens & Transações
```bash
GET  /api/tokens                 # Listar tokens
GET  /api/tokens/holders         # Token holders
POST /api/tokens/buy             # Comprar tokens
GET  /api/transactions           # Histórico
```

## 🤝 Contribuição

### Padrões de Código
- **Backend**: ESLint + Prettier
- **Frontend**: Vue.js 3 + Composition API
- **Commits**: Conventional Commits
- **Branches**: GitFlow

### Como Contribuir
1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Commit: `git commit -m 'feat: adiciona nova funcionalidade'`
4. Push: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

---

**TokenVerde** - *Desburocratizando a compensação ambiental através da tecnologia.* 🌿

*Conectando preservação ambiental com oportunidades de investimento sustentável.* 