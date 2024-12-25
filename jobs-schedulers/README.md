# Job Scheduler de Bills e Recorrências

Este projeto é um backend simples em **Node.js**, utilizando **Prisma**, **Typescript**, e **MySQL** para gerenciar contas (**Bills**) e suas recorrências (**Bill Recurrences**). Ele inclui a funcionalidade de verificação mensal para gerar automaticamente contas com base em recorrências configuradas.

---

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Typescript**: Superset de JavaScript com tipagem estática.
- **Prisma**: ORM para interação com o banco de dados MySQL.
- **MySQL**: Banco de dados relacional.
- **node-cron**: Para agendar tarefas recorrentes.
- **winston**: Biblioteca para logging.
- **zod**: Para validação de dados.

---

## Funcionalidades

1. **Geração Automática de Contas**:

   - Todos os meses, no dia configurado em cada recorrência, é gerada uma nova conta na tabela `bills` com base na tabela `bill_recurrences`.

2. **Logging**:

   - Logs detalhados de eventos importantes (usando `winston`).
   - Armazenamento de logs de erro em arquivos separados.

---

## Estrutura do Projeto

### Arquivo `.env`

Configurações sensíveis como a URL do banco de dados devem ser adicionadas aqui.

```env
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
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
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com a URL do banco de dados.

### 4. Gerar o Cliente Prisma

```bash
npx prisma generate
```

### 5. Rodar a Aplicação

```bash
npm start
```

---

## Melhorias Futuras

1. Implementar monitoramento de logs com ferramentas como ELK ou Grafana.
2. Suporte para diferentes fusos horários nas recorrências.

---
