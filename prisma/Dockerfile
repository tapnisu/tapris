FROM node:20-alpine3.20 as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
COPY . /app/prisma
WORKDIR /app

RUN npm install -D prisma

CMD [ "npx", "prisma", "migrate", "deploy" ]
