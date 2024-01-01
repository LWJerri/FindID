FROM node:18-slim as base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm i pnpm@latest -g
RUN pnpm i

COPY . /app

RUN pnpm build

FROM devforth/spa-to-http:latest
COPY --from=base /app/dist/ .