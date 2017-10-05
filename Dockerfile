FROM node:8.6-alpine
WORKDIR /app
RUN chown -R node /app
USER node
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD npm start