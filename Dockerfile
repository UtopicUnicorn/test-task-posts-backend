FROM node:14.15-alpine AS build
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
