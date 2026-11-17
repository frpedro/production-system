# 💎 Production System

> Sistema completo de gerenciamento de estoque e otimização de produção.


## 🔗 Repositório

- **Repositório:** [https://github.com/frpedro/production-system](https://github.com/frpedro/production-system)

> ℹ️ Este projeto não está mais publicado online (o deploy anterior no Render foi desativado). Siga a seção [Como Rodar Localmente](#-como-rodar-localmente) para executá-lo na sua máquina.

## 📘 Sobre

Sistema web para controle de estoque de matérias-primas e sugestão de produção. O sistema associa produtos às matérias-primas necessárias e calcula automaticamente quais produtos podem ser fabricados com o estoque disponível, priorizando os produtos de maior valor.

## ⚡ Funcionalidades

- 🔷 Gerenciamento completo de matérias-primas (CRUD + controle de estoque)
- 🔷 Gerenciamento de produtos (CRUD + valor)
- 🔷 Associação entre produtos e matérias-primas com quantidades necessárias
- 🔷 Sugestão automática de produção baseada no estoque disponível
- 🔷 Cálculo do valor total da produção sugerida
- 🔷 Interface responsiva para desktop, tablet e mobile

## 🛠️ Tecnologias

### Backend
- Java 21
- Spring Boot 4.0.2
- PostgreSQL
- JPA/Hibernate
- Maven

### Frontend
- React 18
- Redux Toolkit
- Axios
- React Router

### Infraestrutura
- Docker / Docker Compose (PostgreSQL local)
- Variáveis de ambiente (configuração segura)

## 📊 Estrutura

```
production-system/
├── docker-compose.yml                          # PostgreSQL local
├── backend/                                    # API REST Spring Boot
│   ├── src/main/java/com/inventory/production/
│   │   ├── config/                            # Configurações (CORS)
│   │   ├── controller/                        # Endpoints REST
│   │   ├── dto/                               # Data Transfer Objects
│   │   ├── entity/                            # Entidades JPA
│   │   ├── exception/                         # Tratamento de erros
│   │   ├── repository/                        # Acesso a dados (JPA)
│   │   ├── service/                           # Lógica de negócio
│   │   └── ProductionSystemApplication.java   # Classe principal
│   ├── src/main/resources/
│   │   ├── application.properties             # Configuração (DB, CORS, porta)
│   │   └── data.sql                           # Dados iniciais (seed)
│   ├── mvnw / mvnw.cmd                        # Maven Wrapper
│   └── pom.xml                                # Dependências Maven
│
├── frontend/                                   # React SPA
│   ├── public/                                # Arquivos estáticos
│   ├── .env                                   # URL da API (REACT_APP_API_URL)
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js                         # Configuração Axios
│   │   ├── components/
│   │   │   ├── Production/                    # Sugestões de produção
│   │   │   ├── Products/                      # CRUD de produtos
│   │   │   ├── RawMaterials/                  # CRUD de matérias-primas
│   │   │   └── Toast/                         # Notificações
│   │   ├── store/
│   │   │   ├── slices/
│   │   │   │   ├── productionSlice.js         # Estado de produção
│   │   │   │   ├── productsSlice.js           # Estado de produtos
│   │   │   │   └── rawMaterialsSlice.js       # Estado de matérias-primas
│   │   │   └── store.js                       # Configuração Redux
│   │   ├── App.js                             # Componente principal + rotas
│   │   └── index.js                           # Entry point
│   └── package.json                           # Dependências npm
│
└── README.md
```

## 🌐 Endpoints da API

### Matérias-Primas
```
GET    /api/raw-materials
POST   /api/raw-materials
PUT    /api/raw-materials/{id}
DELETE /api/raw-materials/{id}
```

### Produtos
```
GET    /api/products
POST   /api/products
PUT    /api/products/{id}
DELETE /api/products/{id}
```

### Produção
```
GET    /api/production/suggestions
```

## 📸 Screenshots

### Tela de Matérias-Primas
> <img width="1920" height="941" alt="Sistema-de-Produção-02-10-2026_09_15_PM" src="https://github.com/user-attachments/assets/02233f3a-4ac3-452f-9e88-37de2a44e618" />


### Tela de Produtos
><img width="1920" height="941" alt="Sistema-de-Produção-02-10-2026_09_15_PM (1)" src="https://github.com/user-attachments/assets/b6a488a8-37a9-4eab-949e-4d67c5401e69" />

### Tela de Sugestão de Produção
> <img width="1920" height="941" alt="Sistema-de-Produção-02-10-2026_09_15_PM (2)" src="https://github.com/user-attachments/assets/423d012a-2c57-4768-a57d-8fcf9e1a661e" />


## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Java 21 (JDK)](https://adoptium.net/)
- [Node.js 18+](https://nodejs.org/) (com npm)
- [Docker](https://www.docker.com/) e Docker Compose

> Não é necessário instalar o Maven: o backend usa o Maven Wrapper (`mvnw`/`mvnw.cmd`), que baixa a versão correta automaticamente.

### 1. Clonar o repositório

```bash
git clone https://github.com/frpedro/production-system.git
cd production-system
```

### 2. Subir o banco de dados (PostgreSQL)

Na raiz do projeto:

```bash
docker compose up -d
```

Isso cria um PostgreSQL em `localhost:5432` com usuário `postgres`, senha `postgres` e banco `production_system` — exatamente o que o backend espera por padrão (veja `backend/src/main/resources/application.properties`). Nenhuma variável de ambiente precisa ser configurada manualmente.

Na primeira vez que o backend rodar, as tabelas serão criadas automaticamente (Hibernate) e alguns dados de exemplo (matérias-primas e produtos) serão inseridos (`backend/src/main/resources/data.sql`), para que as telas já mostrem conteúdo.

### 3. Rodar o backend

```bash
cd backend
./mvnw spring-boot:run      # Linux/macOS/Git Bash
mvnw.cmd spring-boot:run    # Windows (cmd/PowerShell)
```

O backend sobe em `http://localhost:8080`.

### 4. Rodar o frontend

Em outro terminal:

```bash
cd frontend
npm install
npm start
```

O frontend sobe em `http://localhost:3000` e já está configurado para consumir a API em `http://localhost:8080` (variável `REACT_APP_API_URL` em `frontend/.env`).

### 5. Acessar

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **API:** [http://localhost:8080](http://localhost:8080)

Para apontar o frontend para outro endereço de backend, ou liberar o CORS para outra origem, basta ajustar `REACT_APP_API_URL` (frontend) e `FRONTEND_URL` (variável de ambiente do backend, padrão `http://localhost:3000`).

## ✅ Requisitos Atendidos

### Não Funcionais
- ✔️ Sistema web (Chrome, Firefox, Edge)
- ✔️ Arquitetura API (Backend separado do Frontend)
- ✔️ Interface responsiva
- ✔️ PostgreSQL como banco de dados
- ✔️ Backend com Spring Framework
- ✔️ Frontend com React e Redux
- ✔️ Código 100% em inglês

### Funcionais
- ✔️ CRUD completo de produtos (Backend + Frontend)
- ✔️ CRUD completo de matérias-primas (Backend + Frontend)
- ✔️ Associação de matérias-primas aos produtos
- ✔️ Consulta de produtos que podem ser produzidos

## 👤 Autor

**Pedro Fernandes**

[![GitHub](https://img.shields.io/badge/GitHub-frpedro-181717?logo=github)](https://github.com/frpedro)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-pedrofernandesh-0077B5?logo=linkedin)](https://www.linkedin.com/in/pedrofernandesh/)

---

💎 Desenvolvido por *Pedro Fernandes*.
