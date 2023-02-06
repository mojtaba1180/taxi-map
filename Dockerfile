#STEP 1
FROM hub.azadiweb.ir/node:16 as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN NPM_CONFIG_PRODUCTION=false yarn install
COPY . .
EXPOSE 3500
CMD ["yarn","run","dev"]

# STEP 2
