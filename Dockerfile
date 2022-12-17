FROM node:alpine
WORKDIR /loginall
COPY package*.json ./
COPY .env ./
RUN npm install, export $(cat .env | xargs)
COPY . .
CMD ["npm", "start"]
EXPOSE 8080