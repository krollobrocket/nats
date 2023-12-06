FROM node:lts

ARG SUB_PORT=$SUB_PORT
ARG NATS_HOST=$NATS_HOST
ARG NATS_PORT=$NATS_PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV SUB_PORT=$SUB_PORT
ENV NATS_HOST=$NATS_HOST
ENV NATS_PORT=$NATS_PORT

EXPOSE $SUB_PORT

CMD ["node", "dist/subscriber.js"]
