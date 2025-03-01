# VKGames Store - Painel Administrativo
VKGames é um painel administrativo simples para uma loja de jogos antigos, desenvolvido com Node.js, Express e EJS como engine de visualização.

## Tecnologias Utilizadas
  - **Node.js**
  - **Express**
  - **EJS** (Template Engine)
  - **MySQL**
  - **Multer** (Upload de arquivos)
  - **JWT** (Autenticação)
  - **Bcrypt.js** (Criptografia de senhas)
  - **Nodemailer** (Envio de e-mails)

## Instalação
1. Clone este repositório:
  ```bash
  git clone https://github.com/victorjardim-dev/vkgames.git
  cd vkgames
  ```
2. Instale as dependências:
  ```bash
  npm install
  ```
3. Configure o arquivo `.env` com as seguintes variáveis:
  ```env
  APP_PORT=3000
  APP_PORT_SSL=443
  APP_SECRET_KEY_SESSION=string_de_secao
  APP_SECRET_KEY_COOKIEPARSER=string_de_cookieparser
  APP_SECRET_KEY_JWT=string_de_jwt
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=sua_senha
  DB_NAME=vkgames
  db_PORT=3306
  SEND_EMAIL_USER=seu_email
  SEND_EMAIL_PASS=sua_senha_do_email
  SEND_EMAIL_HOST=host_de_email
  SEND_EMAIL_PORT=porta_do_email
  SEND_EMAIL_SECURE=seguranca_ssl
  SEND_EMAIL_SERVICE=para_servico_de_email

  Escolha entre host para email pessoal de hospedagem ou service (por exemplo: gmail)
  ```
4. Execute a query em `./src/connection/vkgames.sql`

## Uso
### Iniciar o servidor em modo desenvolvimento:
```bash
npm run dev
```
O servidor rodará em: `http://localhost:3000/vkgames`

## Estrutura do Projeto
  ```
    /vkgames
    │── /public            # Arquivos estáticos (CSS, JS, imagens)
    |── /views             # Templates EJS
    │── /src
    │   ├── /connection    # Configuração do banco de dados
    │   ├── /middlewares   # Funções de middlewares
    │   ├── /controllers   # Lógica de controle das rotas
    │   ├── /repositories  # Modelos do banco de dados
    │   ├── /routes        # Rotas da aplicação
    │   ├── /utils         # Funções de apoio
    │── server.js          # Arquivo principal do servidor
    │── package.json       # Configuração do projeto
    │── .env               # Variáveis de ambiente
  ```
