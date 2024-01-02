FROM node:20-slim as base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable
RUN pnpm i

COPY . /app

RUN pnpm build

FROM devforth/spa-to-http:latest

COPY --from=base /app/dist/ .