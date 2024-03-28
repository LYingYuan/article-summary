FROM node:alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && \
    pnpm install

COPY . .

EXPOSE 3000

CMD [ "node", "src/index.js" ]