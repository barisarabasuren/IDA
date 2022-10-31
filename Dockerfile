FROM node:16.4.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY src/ src/
COPY swagger.json ./

USER node

CMD [ "npm", "start" ]

EXPOSE 8000