FROM node:lts-alpine

WORKDIR /

COPY . .

RUN yarn

RUN yarn prisma:generate
RUN yarn build

USER tapris

CMD ["node", "dist/index.js"]
