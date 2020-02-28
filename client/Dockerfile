FROM node:12.16-alpine3.11

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

EXPOSE 3000

CMD [ "npm", "start"]
