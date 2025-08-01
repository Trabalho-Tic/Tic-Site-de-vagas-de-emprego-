<h1 align="center">
  🌐 Backend - Vagas PCD
</h1>

<p align="center">
  <strong>API Node.js + Express + PostgreSQL</strong> para um site de <strong>vagas de emprego voltado a pessoas com deficiência (PCD)</strong>, com foco em <em>acessibilidade digital</em> 🧑‍🦽💼
</p>

<p align="center">
    <img width=470 src="https://veja.abril.com.br/wp-content/uploads/2016/05/giphy-3-original.gif?w=500&h=300&crop=1">
</p>

<p align="center">
  <img src="http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge" height="180" alt="Coding gif" />
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a> • 
  <a href="#-como-rodar-o-projeto">Rodar localmente</a> • 
  <a href="#-objetivo">Objetivo</a> • 
  <a href="#-estrutura">Estrutura</a> • 
  <a href="#-licença">Licença</a>
</p>

---

## 🚀 Projeto em desenvolvimento

> ⚠️ Este projeto ainda está em fase de construção. Muitas funcionalidades estão por vir, e melhorias na arquitetura e nas rotas estão sendo feitas com o tempo.

---

## 🧠 Tecnologias

<div align="left">

- ✅ Node.js
- ✅ Express
- ✅ Sequelize ORM
- ✅ PostgreSQL
- ✅ dotenv
- ✅ Nodemon (dev)
- ✅ JavaScript

</div>

---

## 🧑‍💻 Como rodar o projeto

### 1️⃣ Clone o repositório

```bash
git clone "https://github.com/Trabalho-Tic/Tic-Site-de-vagas-de-emprego-"
cd suapasta
```

2️⃣ Instale as dependências
```bash
npm install
```

3️⃣ Configure seu .env
Crie um arquivo .env na raiz com os dados do seu banco PostgreSQL:

env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
DB_PORT=5432


4️⃣ Inicie o servidor
```bash
npm run dev
A API vai subir em: http://localhost:ADEFINIR
```

## 💡 Objetivo
Este projeto tem como meta criar uma plataforma de vagas inclusiva e acessível, facilitando a conexão entre empresas e pessoas com deficiência (PCD), promovendo a diversidade no mercado de trabalho. 🌍

<p align="center"> <img src="https://cdn.dribbble.com/users/1520866/screenshots/16328897/media/9bfb0e470db4bc4b2609f8df4e3ff0e2.gif" height="200" alt="Inclusão e acessibilidade"> </p>

## 📦 Estrutura do Projeto
```bash
src/
├── config/        # Configurações de banco de dados
├── controllers/   # Lógica das rotas
├── models/        # Definição dos modelos do Sequelize
├── routes/        # Rotas da aplicação
├── app.js         # Arquivo principal
```

.env
✅ Funcionalidades atuais
 Conexão com PostgreSQL via Sequelize

 Cadastro e listagem de usuários (modelo base)

 Estrutura inicial para rotas REST

 Sistema de vagas

 Cadastro de empresas e candidatos

 Filtros e acessibilidade nas buscas

 JWT e autenticação

🤝 Contribuindo
Este projeto é parte de um trabalho universitário, mas ideias, feedbacks e melhorias são sempre bem-vindos! 💬

## 📚 Licença
Este projeto é livre para fins educacionais e não comerciais.

<p align="center"> Feito com ❤️ por estudantes que acreditam na inclusão digital </p> ```