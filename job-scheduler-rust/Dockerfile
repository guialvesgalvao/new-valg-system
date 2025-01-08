# Use uma imagem oficial do Rust
FROM rust:1.72 AS builder

# Defina o diretório de trabalho
WORKDIR /app

# Copie o código para o container
COPY . .

# Compile o projeto em modo release
RUN cargo build --release

# Use uma imagem mínima para rodar o binário
FROM debian:bullseye-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copie o binário gerado pelo builder
COPY --from=builder /app/target/release/job_scheduler_rust .

# Exponha a porta que sua aplicação usa
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["./job_scheduler_rust"]
