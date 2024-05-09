FROM node:20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

RUN pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm run build

CMD [ "pnpm", "run", "start:migrate:prod" ]
