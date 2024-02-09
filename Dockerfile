FROM node:lts-alpine

WORKDIR /

COPY . .

RUN pnpm

RUN pnpm prisma:generate
RUN pnpm build

USER tapris

CMD ["node", "dist/index.js"]
