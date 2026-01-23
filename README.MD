# CasaGastos WebAPI

Aplicação para controle financeiro, onde o usuário pode criar perfis, categorias, transações e visualizar relatórios para acompanhar e controlar seus gastos.

---

## Pré-requisitos

- .NET 9 SDK
- Node.js
- PostgreSQL

---

## Configuração do banco de dados

Para configurar o postgres, abra a pasta principal e digite no CMD:
<code>psql -U postgres -f script.sql</code>

Configure a string de conexão no arquivo `appsettings.json`
Exemplo: <code>Host=localhost;Database=casagastos;Username=postgres;Password=SUA_SENHA</code>

## Configuracao do projeto:

### back-end
1. Abra a pasta (Casa Gastos webAPI) no CMD, e execute:

<code>dotnet restore</code>
<code>dotnet build</code>
<code>dotnet run</code>

O back-end roda na porta <b>7223</b>

### front-end

1. Abra a pasta (CasaGastos) no cmd, e execute:

<code>npm install</code>
<code>npm run dev</code>

O front-end roda na porta <b>5173</b>