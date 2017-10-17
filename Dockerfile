FROM node:8.7-alpine
WORKDIR /app
RUN npm install yarn -g && chown -R node /app
USER node
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile && yarn cache clean
COPY . .
RUN yarn build
CMD npm start