# Deploy do Projeto com Docker

Este documento explica como construir e executar o projeto Rust usando Docker.

## Requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (opcional, se usado)

## Construir a Imagem Docker

1. Navegue até o diretório raiz do projeto onde o arquivo `Dockerfile` está localizado.

2. Construa a imagem Docker usando o comando:
   ```bash
   docker build -t new_vag_job_scheduler_rs .
   ```
