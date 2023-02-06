#STEP 1
FROM hub.azadiweb.ir/node:16 as builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

# STEP 2
