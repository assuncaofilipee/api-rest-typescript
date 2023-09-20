FROM node:gallium-alpine
WORKDIR /app

COPY package*.json yarn.lock ./
COPY tsconfig*.json ./
COPY ./src ./src

## This line is for gke credentials file (only on GCP)
COPY *.credentials.json ./

RUN yarn install && \
    yarn build

EXPOSE ${APP_PORT}

CMD ["yarn", "start"]