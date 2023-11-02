FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install

COPY . .

EXPOSE 3003

# Comando para iniciar la aplicación
CMD [ "node", "index.js" ]
