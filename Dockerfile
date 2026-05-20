FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Expõe a porta que o Vite utiliza por padrão
EXPOSE 5173

# Inicia o servidor de desenvolvimento do Vite expondo para a rede hospedeira
CMD ["npm", "run", "dev", "--", "--host"]