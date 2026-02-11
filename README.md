# 💎 Production System

> Sistema completo de gerenciamento de estoque e otimização de produção desenvolvido como teste técnico para Projedata.


## 🔗 Acesso

- **Frontend:** [https://production-system-front-end.onrender.com/](https://production-system-front-end.onrender.com/)
- **API:** [https://production-system-api.onrender.com/](https://production-system-api.onrender.com/)
- **Repositório:** [https://github.com/frpedro/production-system](https://github.com/frpedro/production-system)

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

### Deploy
- Render (Frontend + Backend + Database)
- Variáveis de ambiente (configuração segura)

## 📊 Estrutura

```
production-system/
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
│   ├── pom.xml                                # Dependências Maven
│   └── render.yaml                            # Deploy Render
│
├── frontend/                                   # React SPA
│   ├── public/                                # Arquivos estáticos
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
> Screenshot em breve

### Tela de Produtos
> Screenshot em breve

### Tela de Sugestão de Produção
> Screenshot em breve

## 🚀 Como Testar

1. Acesse: [https://production-system-front-end.onrender.com/](https://production-system-front-end.onrender.com/)
2. Cadastre matérias-primas com estoque
3. Cadastre produtos e associe matérias-primas
4. Visualize a sugestão de produção otimizada

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

💎 Desenvolvido para **Projedata**.