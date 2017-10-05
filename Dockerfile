FROM node:8.6-alpine
WORKDIR /app
RUN npm install yarn -g && chown -R node /app
USER node
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
CMD npm start