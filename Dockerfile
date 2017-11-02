FROM node:8.9-alpine
WORKDIR /app
RUN npm install yarn -g && chown -R node /app
USER node
COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY . .
RUN yarn build && rm -rf node_modules && yarn install --pure-lockfile --prod && yarn cache clean
CMD ["node", "index.js"]
