# Job Scheduler de Bills e Recorrências em Rust ⏱️

## Este projeto é um backend simples em **Rust**, utilizando **SQLx** para interagir com um banco de dados **MySQL**. Ele é um job scheduler que gera contas automaticamente com base em recorrências configuradas. O projeto também inclui logging detalhado de eventos importantes.

## Tecnologias Utilizadas

1. **Rust** (Linguagem de Programação) - Para o backend.
2. **SQLx** (ORM) - Para interagir com o banco de dados.
3. **MySQL** (Banco de Dados)
4. **Tokio** (Runtime para Rust) - Para rodar o servidor.
5. **Cron** (Biblioteca Rust) - Para agendar tarefas.

---

## Funcionalidades

1. **Adicionar Recorrência** - Adiciona uma nova recorrência ao sistema.
2. **Listar Recorrências** - Lista todas as recorrências cadastradas.
3. **Adicionar Conta** - Adiciona uma nova conta ao sistema.
4. **Listar Contas** - Lista todas as contas cadastradas.
5. **Listar Contas por Recorrência** - Lista todas as contas geradas por uma recorrência específica.
6. **Listar Contas por Data** - Lista todas as contas geradas em uma data específica.

---

## Estrutura do Projeto

### Arquivo `.env`

Configurações sensíveis como a URL do banco de dados devem ser adicionadas aqui.

```env
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
RUST_LOG="info"
RUST_ENV="development"
```

---

## Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd <nome-do-repositorio>
```

### 2. Instalar Dependências

```bash
cargo build
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as configurações necessárias.

````env

### 4. Executar o Projeto

```bash
cargo run
```

---

## Melhorias Futuras

1. **Adicionar Autenticação** - Adicionar autenticação para proteger as rotas.
2. **Adicionar Testes** - Adicionar testes unitários e de integração.
````
