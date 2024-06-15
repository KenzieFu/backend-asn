FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

USER node

COPY --chown=node:node ./ ./

CMD ["npm","start"];