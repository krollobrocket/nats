FROM node:lts

ARG PUB_PORT=$PUB_PORT
ARG NATS_HOST=$NATS_HOST
ARG NATS_PORT=$NATS_PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PUB_PORT=$PUB_PORT
ENV NATS_HOST=$NATS_HOST
ENV NATS_PORT=$NATS_PORT

EXPOSE $PUB_PORT

CMD ["node", "dist/publisher.js"]
