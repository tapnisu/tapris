FROM node:20-alpine3.20 AS base
LABEL authors="tapnisu"

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN apk add --no-cache ffmpeg
COPY package.json pnpm-lock.yaml /app/
RUN npm install --global corepack && corepack enable && corepack prepare

FROM base AS os-build-deps
RUN apk add --no-cache \
  alpine-sdk \
  libsodium-dev \
  python3

FROM os-build-deps AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install prisma --save-prod --prod

COPY ./prisma /app/prisma
RUN pnpm prisma generate

FROM os-build-deps AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

COPY ./prisma /app/prisma
RUN pnpm prisma generate

COPY . /app
RUN pnpm run build

FROM base
COPY --from=build /app/dist /app/dist
COPY --from=build /app/locales /app/locales
COPY --from=build /app/prisma /app/prisma
COPY --from=prod-deps /app/node_modules /app/node_modules

CMD [ "pnpm", "run", "start:migrate:prod" ]
