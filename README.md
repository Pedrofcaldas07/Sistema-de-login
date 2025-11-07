# Sistema login

Este projeto é uma aplicação de um sistema de login com node.js

---

## Como Rodar o Projeto
#### 1. Clone o repositorios e instale as dependencias:

```bash
npm install - y
```
Configure o package.json: 
```bash
{
  "name": "sistemalogin",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "nodemon server.js"
  }
}
```
Instale as dependencias:
```bash
npm install bcrypt dotenv express http mysql2 nodemon router
```
#### 2. Configure o banco de dados sql
```bash
CREATE DATABASE sistemaLogin;
USE sistemaLogin;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL DEFAULT 'Sem nome',
    email VARCHAR(120) NOT NULL,
    cpf varchar(100) NOT NULL UNIQUE,
    senha VARCHAR(250) NOT NULL
);
```

#### 3. Inicie o servidor:
```bash
npm start
```

---

## Estrutura de pastas
```bash
sistemaLogin/
│
├── .env
├── .gitignore
├── server.js
├── package.json
├── README.MD
├── package-lock.json
│
├── controllers/
│   └── controller.js
│
├── models/
│   └── models.js
│
├── routes/
│   └── routes.js
│
├── config/
│   └── db.js
│
└── view
    └── index.html
    └── login.html
    └── register.html
    └── usuarios.html
    └── perfil.html
    └── perfilEdit.html
```

---

## Rotas da API
#### Base url: ```http://localhost:3000/```

#### 1. Registrar
  POST ```/register```

#### 2. Login
  POST ```/login```

#### 3. Perfil
  GET ```/perfil```

#### 4. Editar usuario
  PATCH ```/perfil/edit/:id```

#### 5. Deletar usuario
  DELETE ```/perfil/delete/:id```

#### 6. Mostrar usuarios
  GET ```/buscar/usuarios```
