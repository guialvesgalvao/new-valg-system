# Usar a imagem oficial do Node.js versão 20
FROM node:20-alpine

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código daX aplicação
COPY . .

# Construir a aplicação
RUN npm run build

# Expor a porta 3000
EXPOSE 3000

# Iniciar a aplicação
CMD ["npm", "run", "start"]