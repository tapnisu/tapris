FROM node:18-alpine3.21 AS base
LABEL authors="tapnisu"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN apk add --no-cache ffmpeg openssl
COPY package.json pnpm-lock.yaml /app/
RUN npm install --global corepack@latest && corepack enable && corepack prepare --activate

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install prisma --save-prod --prod

COPY ./prisma /app/prisma
RUN pnpm prisma generate

FROM prod-deps AS build
RUN apk add --no-cache \
  alpine-sdk \
  libsodium-dev \
  python3

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY . /app
RUN pnpm run build

FROM base
COPY --from=build /app/dist /app/dist
COPY --from=build /app/locales /app/locales
COPY --from=build /app/prisma /app/prisma
COPY --from=prod-deps /app/node_modules /app/node_modules

CMD [ "pnpm", "run", "start:migrate:prod" ]
