# Clientes Teddy Open Finance

## 🌐 Deploy

Você pode acessar a aplicação online pelo link:  
🔗 **https://clientes-teddy.vercel.app/**

---

## 🔧 Próximos pontos de melhoria técnica

- Implementar testes E2E utilizando Cypress
- Aumentar cobertura de testes unitários e integração (React Testing Library + Jest)
- Aplicar `commitlint` com integração completa na pipeline

---

## 📝 Descrição

<p >📋 Aplicação criada como parte de um teste técnico para avaliar habilidades com React + Vite e TypeScript, boas práticas de desenvolvimento front-end.</p>

<h4 align="center"> 
	🚧  Projeto Clientes Teddy 🚀 Concluído (com melhorias em andamento) 🚧
</h4>

---

## 🚀 Rodando o projeto

### 🐳 Usando Docker

```bash
# Clone o repositório
git clone [URL_DO_REPOSITORIO]
cd clientes-teddy

# Suba a aplicação com Docker
docker-compose up --build
```

A aplicação ficará disponível em `http://localhost:5173` ou conforme configurado no docker-compose.

### 💻 Manualmente (modo local)

```bash
# Instale as dependências
npm install

# Rode a aplicação localmente
npm run dev
```

---

## 📁 Estrutura do Projeto

A estrutura foi baseada em boas práticas sugeridas pela comunidade para projetos React escaláveis.  
Alguns padrões adotados:

- Separação de responsabilidades por domínio (`pages`, `components`, `services`, `store`, etc.)
- Uso de `theme.js` para personalização global do MUI
- Utilização de variáveis de ambiente com `.env`
- Formulários com validação usando `react-hook-form`
- Separação de rotas em módulo dedicado (`routes/index.tsx`)

---

## 🛠 Tecnologias e ferramentas utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material UI (MUI)](https://mui.com/)
- [SASS](https://sass-lang.com/)
- [Redux + React-Redux](https://react-redux.js.org/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) (parcialmente implementado)
- [ESLint + Prettier](https://eslint.org/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 📌 Referências úteis

- Projeto base com Vite: https://vite.dev/guide/
- Redux: https://redux.js.org/usage/usage-with-typescript  
- Organização de pastas: https://www.rocketseat.com.br/blog/artigos/post/organizacao-pastas-react-estrutura-escalavel  
- Axios: https://axios-http.com/ptbr/docs/intro  
- Padrões de commit: https://github.com/iuricode/padroes-de-commits  
- Dockerizar app React: https://www.docker.com/blog/how-to-dockerize-react-app/

---

## 👨‍💻 Autor

<a href="https://github.com/marevandro95">
   <img style="border-radius: 50%;" src="https://github.com/marevandro95.png" width="100px;" alt=""/>
   <br />
   <p><b>Márcio Evandro</b></p>
</a>

Desenvolvido com dedicação por Márcio Evandro 🧡

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/marcioevandro/)

---
