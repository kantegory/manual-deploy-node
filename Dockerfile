# builder
FROM node:lts-alpine AS builder

ENV NODE_ENV production

WORKDIR /opt/app
COPY . /opt/app/

RUN npm install --omit=dev

RUN npm run build

# prod
FROM node:lts-alpine AS prod

ENV NODE_ENV production

WORKDIR /opt/app
COPY --from=builder /opt/app/dist /opt/app/
COPY --from=builder /opt/app/node_modules /opt/app/node_modules

CMD node /opt/app/index.js
