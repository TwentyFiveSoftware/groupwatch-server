# BUILD
FROM node:14.15 as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ./src ./src

RUN npm install
RUN npm run build

# PRODUCTION
FROM node:14.15

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --only=production

COPY --from=build /usr/src/app/build ./build

CMD node ./build/index.js