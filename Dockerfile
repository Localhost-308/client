FROM node:20-alpine

WORKDIR /app

# Copiar apenas os arquivos necessários para instalação
COPY package.json package-lock.json ./

# Instalar dependências incluindo os pacotes problemáticos
RUN npm install --force \
    leaflet \
    react-leaflet \
    echarts-for-react \
    @types/leaflet \
    @types/react-leaflet

# Copiar o restante dos arquivos
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]