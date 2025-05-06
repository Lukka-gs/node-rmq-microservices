# Node RMQ Microservices

Microsserviços em Node.js com RabbitMQ para comunicação assíncrona, desenvolvidos por Lukka G. Soares.

## 🧩 Estrutura do Projeto

- `api-gateway-service/` → Gerencia as requisições HTTP e repassa para os serviços.
- `account-service/` → CRUD de usuários e envio de eventos para a fila.
- `mailer-service/` → Consome a fila de notificações e simula envio de e-mails.

## 🚀 Como Rodar

### Pré-requisitos
- Node.js
- Docker e Docker Compose

### 1. Suba o RabbitMQ

```bash
docker-compose up -d
```

### 2. Instale dependências

```bash
cd cada-pasta-do-serviço
npm install
```

### 3. Inicie os serviços

Em três terminais separados:

```bash
# Gateway
cd api-gateway-service
npm run start:dev

# Usuários
cd account-service
npm run start:dev

# Notificações
cd mailer-service
npm run start:dev
```

## 🧪 Teste

Envie um `POST` para `http://localhost:3000/users`:

```json
{
  "name": "User Teste",
  "email": "email@teste.com",
  "password": "senha123",
  "cellPhone": "+55999999999"
}
```

## 📬 Sobre

Este projeto tem fins educacionais e demonstra:
- Arquitetura de microsserviços
- Comunicação via RabbitMQ
- Separação de responsabilidades
